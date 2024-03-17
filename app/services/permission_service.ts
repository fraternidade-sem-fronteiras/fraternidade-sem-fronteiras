import ConflictException from '#exceptions/conflict_exception'
import Permission, { PermissionDto } from '#models/permission'

export default class PermissionService {
  async getPermissions(): Promise<string[]> {
    const permissions = await Permission.all()
    return permissions.map((permission) => permission.name)
  }

  async createPermission(name: string): Promise<PermissionDto> {
    const realPermission = await Permission.findBy('name', name.toUpperCase())

    if (realPermission)
      throw new ConflictException('The permission ' + name.toUpperCase() + ' already exists')

    const permission = await Permission.create({ name: name.toUpperCase() })

    return { name: permission.name }
  }
}
