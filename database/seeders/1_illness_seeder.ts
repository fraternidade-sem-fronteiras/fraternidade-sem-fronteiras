import Illness from '#models/illness'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Illness.createMany([
      {
        name: 'Covid-19',
      },
      {
        name: 'Tuberculose',
      },
    ])
  }
}
