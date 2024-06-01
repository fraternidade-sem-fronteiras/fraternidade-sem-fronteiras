import GenderService from '#services/gender_service'
import { paginationValidator } from '#validators/filter'
import { createGenderValidator } from '#validators/gender'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GendersController {
  constructor(readonly genderService: GenderService) {}

  public async index({ response }: HttpContext) {
    const genders = await this.genderService.getGenders()

    return response.json(genders)
  }

  public async store({ request, response }: HttpContext) {
    const payload = await createGenderValidator.validate(request.all())
    const gender = await this.genderService.createGender(payload.name)
    return response.status(201).json(gender)
  }

  public async getAssisteds({ request, response }: HttpContext) {
    const { id } = request.params()

    const pagination = await paginationValidator.validate({
      page: request.input('page', 1),
      limit: request.input('limit', 10),
    })

    const { page, limit } = pagination

    const assisteds = await this.genderService.getAssistedsByGender(id, page, limit)
    return response.json(assisteds)
  }

  public async show({ response, params }: HttpContext) {
    const { id } = params

    const gender = await this.genderService.getGenderById(id)

    if (!gender) {
      return response.status(404).json({ message: 'Gênero não encontrado.' })
    }

    return response.json(gender)
  }

  public async destroy({ response, params }: HttpContext) {
    const { id } = params
    await this.genderService.deleteGender(id)
    return response.status(204)
  }
}
