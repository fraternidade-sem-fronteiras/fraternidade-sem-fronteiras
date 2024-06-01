import Schooling from '#models/schooling'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Schooling.createMany([
      {
        name: 'Não informado',
        default: true,
      },
      {
        name: 'Sem escolaridade',
      },
      {
        name: 'Ensino Fundamental I Incompleto',
      },
      {
        name: 'Ensino Fundamental I Completo',
      },
      {
        name: 'Ensino Fundamental II Incompleto',
      },
      {
        name: 'Ensino Fundamental II Completo',
      },
      {
        name: 'Ensino Médio Incompleto',
      },
      {
        name: 'Ensino Médio Completo',
      },
      {
        name: 'Ensino Superior Incompleto',
      },
      {
        name: 'Ensino Superior Completo',
      },
      {
        name: 'Pós-Graduação Incompleta',
      },
      {
        name: 'Pós-Graduação Completa',
      },
      {
        name: 'Mestrado Incompleto',
      },
      {
        name: 'Mestrado Completo',
      },
      {
        name: 'Doutorado Incompleto',
      },
      {
        name: 'Doutorado Completo',
      },
      {
        name: 'Pós-Doutorado',
      },
    ])
  }
}
