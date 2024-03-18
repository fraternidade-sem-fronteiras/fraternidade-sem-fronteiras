import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import AssistedService from '#services/assisted_service'
import { createAssistedValidator } from '#validators/assisted'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AssistedsController {
  constructor(readonly assistedService: AssistedService) {}

  public async index({ request, response }: HttpContext) {
    const search = decodeURI(request.input('search', ''))
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)

    const assisteds = await this.assistedService.getAssisteds(page, perPage, search)
    return response.json(assisteds)
  }

  public async show({ response, request }: HttpContext) {
    const search = decodeURI(request.param('search', ''))

    const assisted = await this.assistedService.getAssisted(search)

    if (!assisted)
      throw new EntityNotFoundException('O assistido "' + search + '" não foi encontrado!')

    return response.json(assisted)
  }

  public async store({ request, response }: HttpContext) {
    const data = await createAssistedValidator.validate(request.body())
    const assisted = await this.assistedService.createAssisted(data)

    return response.status(201).json(assisted)
  }
}
