import MaritalStatusService from '#services/marital_status_service'
import {
  createMaritalStatusValidator,
  updateMaritalStatusValidator,
} from '#validators/marital_status'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MaritalStatusesController {
  constructor(readonly maritalStatusService: MaritalStatusService) {}

  /**
   * Display list of all marital statuses
   */
  async index({ response }: HttpContext) {
    const maritalStatuses = await this.maritalStatusService.getMaritalStatuses()

    return response.json(maritalStatuses)
  }

  async create({ request, response }: HttpContext) {
    const payload = await createMaritalStatusValidator.validate(request.all())
    const maritalStatus = await this.maritalStatusService.createMaritalStatus(payload.name)
    return response.status(201).json(maritalStatus)
  }

  async show({ response, params }: HttpContext) {
    const { id } = params

    const maritalStatus = await this.maritalStatusService.getMaritalStatusById(id)

    if (!maritalStatus) {
      return response.status(404).json({ message: 'Estado Civil não encontrado.' })
    }

    return response.json(maritalStatus)
  }

  async edit({ response, params }: HttpContext) {
    const { id } = params

    const maritalStatus = await this.maritalStatusService.getMaritalStatusById(id)

    if (!maritalStatus) {
      return response.status(404).json({ message: 'Estado Civil não encontrado.' })
    }

    return response.json(maritalStatus)
  }

  async update({ request, response, params }: HttpContext) {
    const { id } = params
    const payload = await updateMaritalStatusValidator.validate(request.all())
    const data = await this.maritalStatusService.updateMaritalStatus(id, payload.name)
    return response.json({ ...data })
  }

  async destroy({ response, params }: HttpContext) {
    const { id } = params

    await this.maritalStatusService.deleteMaritalStatus(id)

    return response.status(204)
  }
}
