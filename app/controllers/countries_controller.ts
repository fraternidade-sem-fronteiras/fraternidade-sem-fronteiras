import CountriesService from '#services/country_service'
import { paginationValidator } from '#validators/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CountriesController {
  constructor(readonly countryService: CountriesService) {}

  async index({ response }: HttpContext) {
    const countries = await this.countryService.getCountries()
    return response.json(countries)
  }

  public async getAssisteds({ request, response }: HttpContext) {
    const { id } = request.params()

    const pagination = await paginationValidator.validate({
      page: request.input('page', 1),
      limit: request.input('limit', 10),
    })

    const { page, limit } = pagination

    const assisteds = await this.countryService.getAssistedsByCountry(id, page, limit)
    return response.json(assisteds)
  }
}
