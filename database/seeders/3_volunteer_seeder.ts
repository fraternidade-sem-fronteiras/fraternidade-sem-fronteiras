import RoleVolunteer from '#models/role_volunteer'
import Volunteer from '#models/volunteer'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Volunteer.createMany([
      {
        name: 'Administrador',
        email: 'admin@fsf.com',
        password: 'admin@fsf.com',
        registered: false,
      },
    ])

    await RoleVolunteer.createMany([
      {
        roleName: 'Administrador',
        volunteerId: 1,
      },
    ])
  }
}
