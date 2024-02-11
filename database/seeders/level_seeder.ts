import Level from '#models/level'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Level.createMany([
      {
        name: 'Administrador',
      },
      {
        name: 'Médico',
      },
      {
        name: 'Assitente Social',
      },
      {
        name: 'Usuário',
      },
    ])
  }
}
