// import type { HttpContext } from '@adonisjs/core/http'

import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import VolunteerService from '#services/volunteer_service'
import { filtersValidator, paginationValidator, sortValidator } from '#validators/filter'
import { createVolunteerValidator, loginVolunteerValidator } from '#validators/volunteer'
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
    const pagination = await paginationValidator.validate({
      page: request.input('page', 1),
      limit: request.input('limit', 10),
    })

    const filters = await sortValidator.validate({
      orderBy: request.input('orderBy', 'id'),
      order: request.input('order', 'asc'),
    })

    const { orderBy, order } = filters
    const { page, limit } = pagination

    const volunteersPaginated = await this.volunteersService.getVolunteers(
      page,
      limit,
      orderBy,
      order
    )

    return response.json(volunteersPaginated)
  }

  async store({ request, response }: HttpContext) {
    const payload = await createVolunteerValidator.validate(request.all())

    const volunteer = await this.volunteersService.createVolunteer(
      payload.name,
      payload.email,
      payload.roles
    )

    return response.status(201).json(volunteer)
  }

  async show({ response, params }: HttpContext) {
    const { id } = params

    const volunteer = await this.volunteersService.getVolunteer({ id })

    if (!volunteer)
      throw new EntityNotFoundException('Volunteer', 'O voluntário de id ' + id + ' não existe.')

    return response.json(volunteer)
  }

  async destroy({ params, response }: HttpContext) {
    await this.volunteersService.deleteVolunteer(params.id)
    return response.status(204)
  }
}
