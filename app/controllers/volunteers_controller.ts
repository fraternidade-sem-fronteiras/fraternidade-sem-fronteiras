// import type { HttpContext } from '@adonisjs/core/http'

import EntityNotFoundException from '#exceptions/entity_not_found_exception'
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

    const data = await this.volunteersService.createSession(email, password)
    return response.json(data)
  }

  async logout({ response }: HttpContext) {
    return response.json({
      hello: 'world',
    })
  }

  async profile({ request, response }: HttpContext) {
    return response.json(request.all().user)
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
    /**
     * Valida os dados do formulário
     */

    let payload = await createVolunteerValidator.validate(request.all())

    /**
     * Cria um novo voluntário
     */

    const volunteer = await this.volunteersService.createVolunteer(
      payload.name,
      payload.email,
      payload.roles
    )

    /**
     * Retorna o voluntário criado
     */

    return response.status(201).json(volunteer)
  }

  async show({ response, params }: HttpContext) {
    /**
     * Desestrutura o id do voluntário da requisição
     */

    const { id } = params

    /**
     * Busca o voluntário pelo id
     */

    const volunteer = await this.volunteersService.getVolunteer({ id })

    /**
     * Verifica se o voluntário existe
     */

    if (!volunteer) throw new EntityNotFoundException('O voluntário de id ' + id + ' não existe.')

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

    /**
     * Valida os dados do formulário
     */
    let payload = await updateVolunteerValidator.validate(request.all())

    /**
     * Atualiza voluntário
     */
    //const data = await this.volunteersService.updateVolunteer(id, payload)

    //return response.json({ ...data })
  }

  async destroy({ params, response }: HttpContext) {
    /**
     * Desestrutura o id do voluntário da requisição
     */

    const { id } = params

    /**
     * Deleta o voluntário pelo Service
     */

    await this.volunteersService.deleteVolunteer(id)

    /**
     * Retorna o status 204 (No Content)
     */

    return response.status(204)
  }
}
