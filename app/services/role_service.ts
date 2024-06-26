import ConflictException from '#exceptions/conflict_exception'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import InsufficientePermissionException from '#exceptions/insufficiente_permission_exception'
import Permission from '#models/permission'
import Role, { RoleDto } from '#models/role'
import { VolunteerDto } from '#models/volunteer'

export default class RoleService {
  async getRoles(): Promise<RoleDto[]> {
    const roles = await Role.query().preload('permissions', (levelsPermissionQuery) => {
      levelsPermissionQuery.preload('permission')
    })

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      permissions: role.permissions.map((perm) => perm.permission.name),
    }))
  }

  async getRoleById(roleId: string): Promise<RoleDto> {
    const role = await Role.query()
      .preload('permissions', (levelsPermissionQuery) => {
        levelsPermissionQuery.preload('permission')
      })
      .where('id', roleId)
      .first()

    if (!role)
      throw new EntityNotFoundException('Role', 'O cargo de id ' + roleId + ' não foi encontrado.')

    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions.map((perm) => perm.permission.name),
    }
  }

  async createRole(name: string, permissions: string[], volunteer: VolunteerDto): Promise<RoleDto> {
    if (!volunteer.hasPermission('ALL')) {
      throw new InsufficientePermissionException(
        'Somente administradores com permissão geral podem criar roles'
      )
    }

    const realRole = await Role.query().where('name', name).first()

    if (realRole) throw new ConflictException('O cargo ' + name + ' já existe')

    const realPermissions = await Permission.query().whereIn('name', permissions)

    if (realPermissions.length !== permissions.length) {
      const diff = permissions.filter(
        (perm) => !realPermissions.find((realPerm) => realPerm.name === perm)
      )
      throw new ConflictException('As permissões ' + diff.join(', ') + ' não existem')
    }

    const role = await Role.create({ name })

    await role.related('permissions').createMany(
      realPermissions.map((perm) => ({
        roleId: role.id,
        permissionId: perm.id,
      }))
    )

    return {
      id: role.id,
      name: role.name,
      permissions,
    }
  }

  async deleteRoleById(roleId: string): Promise<void> {
    const role = await Role.findBy('id', roleId)

    if (!role)
      throw new EntityNotFoundException('Role', 'O cargo de id ' + roleId + ' não foi encontrado.')

    await role.delete()
  }

  async deleteRole(name: string): Promise<void> {
    const role = await Role.findBy('name', name)

    if (!role)
      throw new EntityNotFoundException('Role', 'O cargo de nome ' + name + ' não foi encontrado.')

    await role.delete()
  }
}
