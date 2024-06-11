import StatesService from '#services/state_service'
import { paginationValidator } from '#validators/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StatesController {
  constructor(readonly stateService: StatesService) {}

  async index({ response }: HttpContext) {
    const states = await this.stateService.getStates()
    return response.json(states)
  }

  public async getAssisteds({ request, response }: HttpContext) {
    const { id } = request.params()

    const pagination = await paginationValidator.validate({
      page: request.input('page', 1),
      limit: request.input('limit', 10),
    })

    const { page, limit } = pagination

    const assisteds = await this.stateService.getAssistedsByState(id, page, limit)
    return response.json(assisteds)
  }
}
