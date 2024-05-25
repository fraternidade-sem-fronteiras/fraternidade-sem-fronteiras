import Medicine from '#models/medicine'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Medicine.createMany([
      {
        name: 'Dipirona',
      },
      {
        name: 'Buscopan',
      },
    ])
  }
}
