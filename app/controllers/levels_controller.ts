import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import LevelService from '#services/level_service'

@inject()
export default class LevelsController {
  constructor(readonly levelService: LevelService) {}

  async index({ response }: HttpContext) {
    // busca todos os atividades
    const levels = await this.levelService.getLevels()

    // retorna os atividades em formato json
    return response.json(levels)
  }
}
