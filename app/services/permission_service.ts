import ConflictException from '#exceptions/conflict_exception'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import Permission, { PermissionDto } from '#models/permission'

export default class PermissionService {
  async getPermissions(): Promise<PermissionDto[]> {
    const permissions = await Permission.all()
    return permissions
  }

  async createPermission(name: string): Promise<PermissionDto> {
    const realPermission = await Permission.findBy('name', name.toUpperCase())

    if (realPermission)
      throw new ConflictException('The permission ' + name.toUpperCase() + ' already exists')

    const permission = await Permission.create({ name: name.toUpperCase() })

    return permission
  }
  async getRolesByPermission(name: string) {
    const permission = await Permission.query()
      .preload('rolePermissions', (rolePermissionsQuery) =>
        rolePermissionsQuery.preload('role', (roleQuery) =>
          roleQuery.preload('permissions', (permissionQuery) =>
            permissionQuery.preload('permission')
          )
        )
      )
      .where('id', name)
      .first()

    if (!permission)
      throw new EntityNotFoundException('Permission', 'The permission ' + name + ' was not found')

    return permission?.rolePermissions.map((rolePermission) => ({
      ...rolePermission.role.toJSON(),
      permissions: rolePermission.role.permissions.map((perm) => perm.permission),
    })) || []
  }
}
