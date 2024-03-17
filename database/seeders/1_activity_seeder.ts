import Activity from '#models/activity'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Activity.createMany([
      {
        name: 'Almoço',
      },
      {
        name: 'Banho',
      },
      {
        name: 'Pegar roupas',
      },
    ])
  }
}
