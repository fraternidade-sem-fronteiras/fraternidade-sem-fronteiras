import MaritalStatusService from '#services/marital_status_service'
import {
  createMaritalStatusValidator,
  updateMaritalStatusValidator,
} from '#validators/marital_status'
import type { HttpContext } from '@adonisjs/core/http'

export default class MaritalStatusesController {
  constructor(readonly maritalStatusService: MaritalStatusService) {}

  /**
   * Display list of all marital statuses
   */
  async index({ response }: HttpContext) {
    const maritalStatuses = await this.maritalStatusService.getMaritalStatuses()

    return response.json(maritalStatuses)
  }

  /**
   * Offers form to create new marital status
   */
  async new({}: HttpContext) {
    /**
     * Não retorna nada por enquanto
     */
  }

  /**
   * Create new marital status on server
   */
  async create({ request, response }: HttpContext) {
    try {
      let payload = await createMaritalStatusValidator.validate(request.all())

      let marital_status = await this.maritalStatusService.createMaritalStatus(payload.name)

      return response.status(201).json(marital_status)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }

  /**
   * Displays one specific marital status's details
   */
  async show({ response, params }: HttpContext) {
    const { id } = params

    const marital_status = await this.maritalStatusService.getMaritalStatusById(id)

    if (!marital_status) {
      return response.status(404).json({ message: 'Estado Civil não encontrado.' })
    }

    return response.json(marital_status)
  }

  /**
   * Offers form to edit specific marital status
   */
  async edit({ response, params }: HttpContext) {
    const { id } = params

    const maritalStatus = await this.maritalStatusService.getMaritalStatusById(id)

    if (!maritalStatus) {
      return response.status(404).json({ message: 'Estado Civil não encontrado.' })
    }

    return response.json(maritalStatus)
  }

  /**
   * Updates specific marital status on server
   */
  async update({ request, response, params }: HttpContext) {
    const { id } = params

    try {
      let payload = await updateMaritalStatusValidator.validate(request.all())

      let data = await this.maritalStatusService.updateMaritalStatus(id, payload.name)

      return response.json({ ...data })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }

  /**
   * Deletes specific marital status
   */
  async destroy({ response, params }: HttpContext) {
    const { id } = params

    try {
      await this.maritalStatusService.deleteMaritalStatus(id)

      return response.status(204)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }
}
