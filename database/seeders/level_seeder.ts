import Level from '#models/level'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Level.createMany([
      {
        id: 1,
        name: 'Usuário',
      },
      {
        id: 2,
        name: 'Assitente Social',
      },
      {
        id: 3,
        name: 'Médico',
      },
      {
        id: 4,
        name: 'Administrador',
      },
    ])
  }
}
