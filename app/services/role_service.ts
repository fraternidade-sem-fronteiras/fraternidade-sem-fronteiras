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
}
