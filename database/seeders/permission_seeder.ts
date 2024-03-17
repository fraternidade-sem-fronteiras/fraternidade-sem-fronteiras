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
      'LIST_ROLE',

      'CREATE_ASSISTED',
      'DELETE_ASSISTED',
      'EDIT_ASSISTED',

      'ALL'
    ]

    await Permission.createMany(permissions.map((permission) => ({ name: permission })))
  }
}
