import IllnessAssistedService from '#services/illness_assisted_service'
import { createIllnessAssistedValidator } from '#validators/illness_assisted'
import type { HttpContext } from '@adonisjs/core/http'

export default class IllnessAssistedsController {
  constructor(readonly illnessAssistedService: IllnessAssistedService) {}
  async index({ request, response }: HttpContext) {
    const page = request.input('page') ?? 1
    const perPage = request.input('perPage') ?? 20

    try {
      return response.json(await this.illnessAssistedService.getIllnessAssisted(page, perPage))
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      const payload = await createIllnessAssistedValidator.validate(request.all())

      const illnessAssisted = await this.illnessAssistedService.createIllnessAssisted(
        payload.assistedId,
        payload.illnessId,
        payload.placeMedicalCare,
        payload.remarks,
        payload.alreadyTreated
      )

      return response.status(201).json({ ...illnessAssisted })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }

  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()

    try {
      await this.illnessAssistedService.deleteIllnessAssisted(id)

      return response.status(200).json({ message: 'IllnessAssisted deleted successfully' })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }
}
