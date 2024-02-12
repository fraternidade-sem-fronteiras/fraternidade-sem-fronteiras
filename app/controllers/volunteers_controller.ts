// import type { HttpContext } from '@adonisjs/core/http'

import VolunteerService from '#services/volunteer_service'
import {
  createVolunteerValidator,
  filtersVolunteerValidator,
  loginVolunteerValidator,
  updateVolunteerValidator,
} from '#validators/volunteer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VolunteersController {
  constructor(readonly volunteersService: VolunteerService) {}

  async login({ request, response }: HttpContext) {
    const { email, password } = await loginVolunteerValidator.validate(request.all())

    const { token, volunteer } = await this.volunteersService.createSession(email, password)

    return response.json({ token, volunteer })
  }

  async logout({ response }: HttpContext) {
    return response.json({})
  }

  async index({ request, response }: HttpContext) {
    const filters = await filtersVolunteerValidator.validate({
      page: request.input('page', 1),
      limit: request.input('limit', 10),
      orderBy: request.input('orderBy', 'id'),
      order: request.input('order', 'asc'),
    })

    const { page, limit, orderBy, order } = filters

    /**
     * Busca os voluntários no banco de dados
     */

    const volunteers = await this.volunteersService.getVolunteers(page, limit, orderBy, order)

    if (volunteers.length === 0) {
      return response.status(404).json({ message: 'Nenhum voluntário encontrado.' })
    }

    /**
     * Retorna os voluntários
     */
    return response.json(volunteers)
  }

  async store({ request, response }: HttpContext) {
    try {
      /**
       * Valida os dados do formulário
       */

      let payload = await createVolunteerValidator.validate(request.all())
      /**
       * Cria um novo voluntário
       */

      if (payload.password == null) {
        payload.password = payload.email
      }

      const volunteer = await this.volunteersService.createVolunteer(
        payload.name,
        payload.email,
        payload.password,
        payload.levelId
      )

      /**
       * Retorna o voluntário criado
       */

      return response.status(201).json(volunteer)
    } catch (error) {
      /**
       * Retorna o erro de validação, caso haja
       */

      return response.status(409).json(error)
    }
  }

  async show({ response, params }: HttpContext) {
    /**
     * Desestrutura o id do voluntário da requisição
     */

    const { id } = params

    /**
     * Busca o voluntário pelo id
     */

    const volunteer = await this.volunteersService.getVolunteerById(id)

    /**
     * Verifica se o voluntário existe
     */

    if (!volunteer) {
      return response.status(404).json({ message: 'Voluntário não encontrado' })
    }

    /**
     * Retorna o voluntário
     */

    return response.json(volunteer)
  }

  async update({ request, params, response }: HttpContext) {
    /**
     * Desestrutura o id do voluntário da requisição
     */

    const { id } = params

    try {
      /**
       * Valida os dados do formulário
       */
      let payload = await updateVolunteerValidator.validate(request.all())

      /**
       * Atualiza voluntário
       */
      const data = await this.volunteersService.updateVolunteer(id, payload)

      return response.json({ ...data })
    } catch (error) {
      /**
       * Retorna que não é possível atualizar um voluntário que não existe
       */

      return response.status(404).json(error)
    }
  }

  async destroy({ params, response }: HttpContext) {
    /**
     * Desestrutura o id do voluntário da requisição
     */

    const { id } = params

    /**
     * Deleta o voluntário pelo Service
     */

    try {
      await this.volunteersService.deleteVolunteer(id)

      /**
       * Retorna o status 204 (No Content)
       */

      return response.status(204)
    } catch (error) {
      /**
       * Retorna que não é possível deletar um voluntário que não existe
       */

      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
