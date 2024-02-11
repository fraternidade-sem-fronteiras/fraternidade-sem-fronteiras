import DrugAssistedService from '#services/drug_assisted_service'
import { createDrugAssistedValidator } from '#validators/drug_assisted'
import type { HttpContext } from '@adonisjs/core/http'

export default class DrugAssistedsController {
  constructor(readonly drugAssistedService: DrugAssistedService) {}
  public async index({ request, response }: HttpContext) {
    const page = request.input('page') ?? 1
    const perPage = request.input('perPage') ?? 20

    return response.json(this.drugAssistedService.getDrugAssisteds(page, perPage))
  }

  public async create({ request, response }: HttpContext) {
    try {
      const payload = await createDrugAssistedValidator.validate(request.all())

      const drugAssisted = await this.drugAssistedService.createDrugAssisted(
        payload.assistedId,
        payload.drugId,
        payload.startTime,
        payload.frequency
      )

      return response.json(drugAssisted)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }

  public async destroy({ request, response }: HttpContext) {
    const { id } = request.params()

    try {
      await this.drugAssistedService.deleteDrugAssistedById(id)

      return response.status(200).json({ message: 'Drug deleted successfully' })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }
}
