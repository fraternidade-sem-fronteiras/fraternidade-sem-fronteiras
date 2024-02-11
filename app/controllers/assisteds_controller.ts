import AssistedService from '#services/assisted_service'
import { createAssistedValidator } from '#validators/assisted'
import type { HttpContext } from '@adonisjs/core/http'

export default class AssistedsController {
  constructor(readonly assistedService: AssistedService) {}

  public async index({ request, response }: HttpContext) {
    const search = request.input('search')
      ? decodeURIComponent((request.input('search') + '').replace(/\+/g, '%20'))
      : null
    const page = request.input('page') ?? 1
    const perPage = request.input('perPage') ?? 20

    try {
      return response.json(await this.assistedService.getAssisteds(page, perPage, search))
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }

  public async show({ response, params }: HttpContext) {
    const { search } = params

    try {
      return response.json(
        await this.assistedService.getAssisted(
          decodeURIComponent((search + '').replace(/\+/g, '%20'))
        )
      )
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const { name } = await createAssistedValidator.validate(request.body())
      const assisted = await this.assistedService.createAssisted(name)

      return response.status(201).json(assisted)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      return response.status(409).json({ message: 'Erro ao criar assistido' })
    }
  }
}
