import BenefitService from '#services/benefit_service'
import { benefitValidator } from '#validators/benefit'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BenefitsController {
  constructor(readonly benefitService: BenefitService) {}

  async index({ response }: HttpContext) {
    const benefits = await this.benefitService.getBenefit()
    return response.json(benefits)
  }

  async create({ request, response }: HttpContext) {
    const payload = await benefitValidator.validate(request.all())
    const benefit = await this.benefitService.createBenefit(payload.name)
    return response.status(201).json(benefit)
  }

  async show({ response, params }: HttpContext) {
    const { id } = params

    const benefit = await this.benefitService.getBenefitById(id)

    if (!benefit) {
      return response.status(404).json({ message: 'Benefício não encontrado.' })
    }

    return response.json(benefit)
  }

  async edit({ response, params }: HttpContext) {
    const { id } = params

    const Benefit = await this.benefitService.getBenefitById(id)

    if (!Benefit) {
      return response.status(404).json({ message: 'Benefício não encontrado.' })
    }

    return response.json(Benefit)
  }

  /**
   * Atualiza um Benefit específico no servidor
   */
  async update({ request, response, params }: HttpContext) {
    const { id } = params
    const payload = await benefitValidator.validate(request.all())
    const benefit = await this.benefitService.updateBenefit(id, payload.name)
    return response.json(benefit)
  }

  async destroy({ response, params }: HttpContext) {
    const { id } = params

    await this.benefitService.deleteBenefit(id)
    return response.status(204)
  }
}
