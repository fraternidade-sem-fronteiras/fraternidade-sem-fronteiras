import Gender from '#models/gender'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Gender.createMany([
      {
        name: 'Não informado',
        default: true,
      },
      {
        name: 'Homem',
      },
      {
        name: 'Mulher',
      },
      {
        name: 'Indefinido',
      },
    ])
  }
}
