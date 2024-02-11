import VisitActivityService from '#services/visit_activity_service'
import { visitActivityValidator } from '#validators/visit_activity'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VisitActivitiesController {
  constructor(readonly visitActivity: VisitActivityService) {}
  /**
   * Lista de exibição de todos as VisitActivities
   */
  async index({ response }: HttpContext) {
    // busca todos os VisitActivities
    const objs = await this.visitActivity.getVisitActivities()

    // retorna os atividades em formato json
    return response.json(objs)
  }

  /**
   * Oferece formulário para criar novo Visit
   */
  async new({}: HttpContext) {
    /**
     * Não retorna nada por enquanto
     */
  }

  /**
   * Criar novo VisitActivity no servidor
   */
  async store({ request, response }: HttpContext) {
    try {
      // valida as informações pelo Validator
      let payload = await visitActivityValidator.validate(request.all())

      // cria um VisitActivity pelo Service
      let obj = await this.visitActivity.createVisitActivity(payload.visitId, payload.activityId)

      // retorna o VisitActivity
      return response.status(201).json(obj)
    } catch (error) {
      // retorna a mensagem de erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ ...error })
      }

      return response.status(409).json({ error: 'Internal Server Error' })
    }
  }

  /**
   * Exibe os detalhes de todos os VisitActivities de um Visit especificado
   */
  async showByVisit({ response, params }: HttpContext) {
    // desestrutura o visitId do VisitActivity da requisição
    const { visitId } = params

    // busca as VisitActivities pelo Service
    const obj = await this.visitActivity.getVisitActivitiesByVisitId(visitId)

    // retorna a mensagem de erro caso os VisitActivities não exista
    if (!obj) {
      return response.status(404).json({ message: 'VisitActivities não encontradas.' })
    }

    // retorna o VisitActivity caso ele exista
    return response.json(obj)
  }

  /**
   * Exclui um VisitActivity específico
   */
  async destroy({ response, params }: HttpContext) {
    // desestrutura os ids do VisitActivity da requisição
    const { visitId, activityId } = params

    try {
      // deleta o VisitActivity pelo Service
      await this.visitActivity.deleteVisitActivity(visitId, activityId)

      // retorna status de sucesso: deletado
      return response.status(204)
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(404).json({ error: error.message })
      }

      return response.status(404).json({ error: 'Internal Server Error' })
    }
  }
}
