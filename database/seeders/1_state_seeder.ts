import State from '#models/state'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await State.createMany([
      {
        name: 'Não informado',
        default: true,
      },
      {
        name: 'Acre',
      },
      {
        name: 'Alagoas',
      },
      {
        name: 'Amapá',
      },
      {
        name: 'Amazonas',
      },
      {
        name: 'Bahia',
      },
      {
        name: 'Ceará',
      },
      {
        name: 'Distrito Federal',
      },
      {
        name: 'Espírito Santo',
      },
      {
        name: 'Goiás',
      },
      {
        name: 'Maranhão',
      },
      {
        name: 'Mato Grosso',
      },
      {
        name: 'Mato Grosso do Sul',
      },
      {
        name: 'Minas Gerais',
      },
      {
        name: 'Pará',
      },
      {
        name: 'Paraíba',
      },
      {
        name: 'Paraná',
      },
      {
        name: 'Pernambuco',
      },
      {
        name: 'Piauí',
      },
      {
        name: 'Rio de Janeiro',
      },
      {
        name: 'Rio Grande do Norte',
      },
      {
        name: 'Rio Grande do Sul',
      },
      {
        name: 'Rondônia',
      },
      {
        name: 'Roraima',
      },
      {
        name: 'Santa Catarina',
      },
      {
        name: 'São Paulo',
      },
      {
        name: 'Sergipe',
      },
      {
        name: 'Tocantins',
      },
    ])
  }
}
            