import SchoolingsService from '#services/schooling_service'
import { paginationValidator } from '#validators/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SchoolingsController {
  constructor(readonly schoolingService: SchoolingsService) {}

  async index({ response }: HttpContext) {
    const schoolings = await this.schoolingService.getSchoolings()
    return response.json(schoolings)
  }

  public async getAssisteds({ request, response }: HttpContext) {
    const { id } = request.params()

    const pagination = await paginationValidator.validate({
      page: request.input('page', 1),
      limit: request.input('limit', 10),
    })

    const { page, limit } = pagination

    const assisteds = await this.schoolingService.getAssistedsBySchooling(id, page, limit)
    return response.json(assisteds)
  }
}
