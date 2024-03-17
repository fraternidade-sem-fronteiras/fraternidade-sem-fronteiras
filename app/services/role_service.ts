import ConflictException from '#exceptions/conflict_exception'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import Permission from '#models/permission'
import Role, { RoleDto } from '#models/role'

export default class RoleService {
  async getRoles(): Promise<RoleDto[]> {
    const roles = await Role.query().preload('permissions', (levelsPermissionQuery) => {
      levelsPermissionQuery.preload('permission')
    })

    return roles.map((role) => ({
      name: role.name,
      permissions: role.permissions.map((perm) => perm.permission.name),
    }))
  }

  async createRole(name: string, permissions: string[]): Promise<RoleDto> {
    const realRole = await Role.query().where('name', name).first()

    if (realRole) throw new ConflictException('The role ' + name + ' already exists')

    const realPermissions = await Permission.query().whereIn('name', permissions)

    if (realPermissions.length !== permissions.length) {
      throw new ConflictException('Some permissions do not exist')
    }

    const role = await Role.create({ name })

    await role
      .related('permissions')
      .createMany(permissions.map((name) => ({ roleName: name, permissionName: name })))

    return {
      name: role.name,
      permissions,
    }
  }

  async deleteRole(name: string): Promise<void> {
    const role = await Role.findBy('name', name)

    if (!role) throw new EntityNotFoundException('The role ' + name + ' does not exist')

    await role.delete()
  }
}
