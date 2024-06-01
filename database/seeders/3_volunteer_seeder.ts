import Role from '#models/role'
import RoleVolunteer from '#models/role_volunteer'
import Volunteer from '#models/volunteer'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const volunteers = await Volunteer.createMany([
      {
        name: 'Administrador',
        email: 'admin@fsf.com',
        password: 'admin@fsf.com',
        registered: false,
      },
    ])

    const roles = await Role.all()

    await RoleVolunteer.createMany([
      {
        roleId: roles.find((role) => role.name === 'Administrador')!.id,
        volunteerId: volunteers[0]!.id,
      },
    ])
  }
}
