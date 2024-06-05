import Permission from '#models/permission'
import Role from '#models/role'
import RolePermission from '#models/role_permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const permissions = await Permission.all()

    const roles: { name: string; permissions: string[] }[] = [
      {
        name: 'Usuário',
        permissions: [],
      },
      {
        name: 'Assistente Social',
        permissions: [],
      },
      {
        name: 'Médico',
        permissions: [],
      },
      {
        name: 'Administrador',
        permissions: [permissions.find((permission) => permission.name === 'ALL')!.id],
      },
    ]

    const realRoles = await Role.createMany(roles.map((role) => ({ name: role.name })))
    

    await RolePermission.createMany(
      roles
        .map((role) => ({
          id: realRoles.find((realRole) => realRole.name === role.name)!.id,
          ...role,
        }))
        .map((role) =>
          role.permissions.map((permission) => ({ roleId: role.id, permissionId: permission }))
        )
        .flat()
    )
  }
}
