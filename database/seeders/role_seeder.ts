import Role from '#models/role'
import Permission from '#models/permission'
import RolePermission from '#models/role_permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const roles: { id: number; name: string; permission: string[] }[] = [
      {
        id: 1,
        name: 'Usuário',
        permission: [],
      },
      {
        id: 2,
        name: 'Assistente Social',
        permission: [],
      },
      {
        id: 3,
        name: 'Médico',
        permission: [],
      },
      {
        id: 4,
        name: 'Administrador',
        permission: ['ALL'],
      },
    ]

    await Role.createMany(roles.map((role) => ({ name: role.name })))

    await Permission.createMany(
      roles
        .map((role) => {
          const array: { name: string }[] = []

          role.permission.forEach((name) => {
            array.push({ name: name })
          })

          return array
        })
        .flat()
    )

    await RolePermission.createMany(
      roles
        .map((role) => {
          const array: { roleName: string; permissionName: string }[] = []

          role.permission.forEach((name) => {
            array.push({ roleName: role.name, permissionName: name })
          })

          return array
        })
        .flat()
    )
  }
}
