import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const permissions: string[] = [
      'CREATE_VOLUNTEER',
      'DELETE_VOLUNTEER',
      'EDIT_VOLUNTEER',

      'CREATE_ROLE',
      'DELETE_ROLE',
      'EDIT_ROLE',

      'CREATE_PERMISSION',
      'DELETE_PERMISSION',
      'LIST_PERMISSION',

      'MANAGE_ASSISTED',
      'CREATE_ASSISTED',
      'DELETE_ASSISTED',
      'EDIT_ASSISTED',

      'VIEW_REPORT',

      'ALL',
    ]

    await Permission.createMany(permissions.map((permission) => ({ name: permission })))
  }
}
