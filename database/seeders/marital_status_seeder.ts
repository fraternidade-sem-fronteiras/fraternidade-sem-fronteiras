import MaritalStatus from '#models/marital_status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await MaritalStatus.createMany([
      {
        name: 'Solteiro(a)',
      },
      {
        name: 'Casado(a)',
      },
      {
        name: 'União Estável',
      },
      {
        name: 'Divorciado(a)',
      },
      {
        name: 'Viúvo(a)',
      },
      {
        name: 'Não sei',
      },
    ])
  }
}
