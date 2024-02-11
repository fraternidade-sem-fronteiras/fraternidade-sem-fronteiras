import Assisted from '#models/assisted'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Assisted.createMany([
      {
        name: 'João Victor',
        socialName: 'João',
        ethnicy: 'Branco',
        cpf: '123.123.123-12',
        rg: '123456789',
        organ: 'DETRAN',
        ctps: '123456789',
        registered: true,
      },
    ])
  }
}
