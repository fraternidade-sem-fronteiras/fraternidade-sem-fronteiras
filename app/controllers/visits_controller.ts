import VisitService from '#services/visit_service'
import { createVisitValidator, visitValidator } from '#validators/visit'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VisitsController {
  constructor(readonly visitService: VisitService) {}
  /**
   * Lista de exibição de todos as Visits
   */
  public async index({ response }: HttpContext) {
    // busca todos os atividades
    const objs = await this.visitService.getVisits()

    // retorna os atividades em formato json
    return response.json(objs)
  }

  /**
   * Oferece formulário para criar novo Visit
   */
  public async new({}: HttpContext) {
    /**
     * Não retorna nada por enquanto
     */
  }

  /**
   * Criar novo Visit no servidor
   */
  public async store({ request, response }: HttpContext) {
    try {
      // valida as informações pelo Validator
      let payload = await createVisitValidator.validate(request.all())

      // cria um Visit pelo Service
      let obj = await this.visitService.createVisit(
        payload.dateVisit,
        payload.assistedId,
        payload.attended,
        payload.description
      )

      // retorna o Visit
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
   * Exibe os detalhes de um Visit específico
   */
  public async show({ response, params }: HttpContext) {
    // desestrutura o id do Visit da requisição
    const { id } = params

    // busca o Visit pelo Service
    const obj = await this.visitService.getVisitById(id)

    // retorna a mensagem de erro caso o Visit não exista
    if (!obj) {
      return response.status(404).json({ message: 'Visita não encontrada.' })
    }

    // retorna o Visit caso ele exista
    return response.json(obj)
  }

  /**
   * Oferece formulário para editar Visit específico
   */
  public async edit({ response, params }: HttpContext) {
    // desestrutura o id do Visit da requisição
    const { id } = params

    // busca o Visit pelo Service
    const obj = await this.visitService.getVisitById(id)

    // retorna a mensagem de erro caso o Visit não exista
    if (!obj) {
      return response.status(404).json({ message: 'Visita não encontrada.' })
    }

    // retorna o Visit caso ele exista
    return response.json(obj)
  }

  /**
   * Atualiza Visit específico no servidor
   */
  public async update({ request, response, params }: HttpContext) {
    // desestrutura o id do Visit da requisição
    const { id } = params

    try {
      // valida as informações pelo Validator
      let payload = await visitValidator.validate(request.all())

      // atualiza as informações pelo Service
      let data = await this.visitService.updateVisit(
        id,
        payload.dateVisit,
        payload.attended,
        payload.description
      )

      // retorna as atualizações realizadas
      return response.json({ ...data })
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(404).json({ ...error })
      }

      return response.status(404).json({ error: 'Internal Server Error' })
    }
  }

  /**
   * Exclui um Visit específico
   */
  public async destroy({ response, params }: HttpContext) {
    // desestrutura o id do Visit da requisição
    const { id } = params

    try {
      // deleta o Visit pelo Service
      await this.visitService.deleteVisit(id)

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
