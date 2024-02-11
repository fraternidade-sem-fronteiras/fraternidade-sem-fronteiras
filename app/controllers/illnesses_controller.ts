import IllnessService from '#services/illness_service'
import { createIllnessValidator } from '#validators/illness'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class IllnessesController {
  constructor(readonly illnessService: IllnessService) {}
  async index({ request, response }: HttpContext) {
    const search = request.input('search')
      ? decodeURIComponent((request.input('search') + '').replace(/\+/g, '%20'))
      : ''
    const page = request.input('page') ?? 1
    const perPage = request.input('perPage') ?? 20

    try {
      return response.json(await this.illnessService.getIllnesses(page, perPage, search))
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }

  async show({ response, params }: HttpContext) {
    const { search } = params

    try {
      return response.json(
        await this.illnessService.getIllnessByName(
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

  async create({ request, response }: HttpContext) {
    try {
      // valida as informações pelo Validator
      let payload = await createIllnessValidator.validate(request.all())

      // cria um Illness pelo Service
      let illness = await this.illnessService.createIllness(payload.name)

      // retorna o Illness
      return response.status(201).json(illness)
    } catch (error) {
      // retorna a mensagem de erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }

  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()

    try {
      await this.illnessService.deleteIllness(id)

      return response.status(200).json({ message: 'Illness deleted successfully' })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }
}
