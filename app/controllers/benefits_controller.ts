import BenefitService from '#services/benefit_service'
import { benefitValidator } from '#validators/benefit'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BenefitsController {
  constructor(readonly benefitService: BenefitService) {}
  /**
   * Lista de exibição de todos os Benefícios
   */
  async index({ response }: HttpContext) {
    // busca todos os Benefícios
    const benefits = await this.benefitService.getBenefit()

    // retorna os benefícios em formato json
    return response.json(benefits)
  }

  /**
   * Oferece formulário para criar novo Benefit
   */
  async new({}: HttpContext) {
    /**
     * Sem retorno no momento
     */
  }

  /**
   * Possibilita criar novo Benefit no servidor
   */
  async create({ request, response }: HttpContext) {
    try {
      // validator possibilita validar as informações
      let payload = await benefitValidator.validate(request.all())

      // cria um Benefit pelo Service
      let benefit = await this.benefitService.createBenefit(payload.name)

      // retorna o Benefit
      return response.status(201).json(benefit)
    } catch (error) {
      // retorna a mensagem de erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }

  /**
   * Exibe os detalhes de um Benefit específico
   */
  async show({ response, params }: HttpContext) {
    // desestrutura o id do Benefit da requisição
    const { id } = params

    // busca o Benefit pelo Service
    const benefit = await this.benefitService.getBenefitById(id)

    // retorna a mensagem de erro caso o Benefit não exista
    if (!benefit) {
      return response.status(404).json({ message: 'Benefício não encontrado.' })
    }

    // retorna o Benefit caso ele exista
    return response.json(benefit)
  }

  /**
   * Oferece um formulário para editar um Benefit em específico
   */
  async edit({ response, params }: HttpContext) {
    // desestrutura o id do Benefit da requisição
    const { id } = params

    // busca o Benifit pelo Service
    const Benefit = await this.benefitService.getBenefitById(id)

    // retorna a mensagem de erro caso o Benefit não exista
    if (!Benefit) {
      return response.status(404).json({ message: 'Benefício não encontrado.' })
    }

    // retorna o Benefit caso ele exista
    return response.json(Benefit)
  }

  /**
   * Atualiza um Benefit específico no servidor
   */
  async update({ request, response, params }: HttpContext) {
    // desestrutura o id do Benefit da requisição
    const { id } = params

    try {
      // valida as informações pelo Validator
      let payload = await benefitValidator.validate(request.all())

      // atualiza as informações pelo Service
      let data = await this.benefitService.updateBenefit(id, payload.name)

      // retorna as atualizações realizadas
      return response.json({ ...data })
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }

  /**
   * Exclui um Benefit específico
   */
  async destroy({ response, params }: HttpContext) {
    // desestrutura o id do Benefit da requisição
    const { id } = params

    try {
      // deleta o Benefit pelo Service
      await this.benefitService.deleteBenefit(id)

      // retorna status de sucesso: deletado
      return response.status(204)
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }
}
