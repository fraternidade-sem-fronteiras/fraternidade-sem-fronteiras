import Drug from '#models/drug'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Drug.createMany([
      {
        name: 'Maconha',
      },
      {
        name: 'Cocaína',
      },
      {
        name: 'k9',
      },
    ])
  }
}
