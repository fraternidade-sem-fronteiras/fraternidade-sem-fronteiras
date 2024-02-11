import ActivityService from '#services/activity_service'
import { activityValidator } from '#validators/activity'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ActivitiesController {
  constructor(readonly activityService: ActivityService) {}
  /**
   * Lista de exibição de todos as Activities
   */
  async index({ response }: HttpContext) {
    // busca todos os atividades
    const objs = await this.activityService.getActivities()

    // retorna os atividades em formato json
    return response.json(objs)
  }

  /**
   * Oferece formulário para criar novo Activity
   */
  async new({}: HttpContext) {
    /**
     * Não retorna nada por enquanto
     */
  }

  /**
   * Criar novo Activity no servidor
   */
  async create({ request, response }: HttpContext) {
    try {
      // valida as informações pelo Validator
      let payload = await activityValidator.validate(request.all())

      // cria um Activity pelo Service
      let obj = await this.activityService.createActivity(payload.name)

      // retorna o Activity
      return response.status(201).json(obj)
    } catch (error) {
      // retorna a mensagem de erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      return response.status(409).json({ message: 'Erro ao criar atividade' })
    }
  }

  /**
   * Exibe os detalhes de um Activity específico
   */
  async show({ response, params }: HttpContext) {
    // desestrutura o id do Activity da requisição
    const { id } = params

    // busca o Activity pelo Service
    const obj = await this.activityService.getActivityById(id)

    // retorna a mensagem de erro caso o Activity não exista
    if (!obj) {
      return response.status(404).json({ message: 'Atividade não encontrada.' })
    }

    // retorna o Activity caso ele exista
    return response.json(obj)
  }

  /**
   * Oferece formulário para editar Activity específico
   */
  async edit({ response, params }: HttpContext) {
    // desestrutura o id do Activity da requisição
    const { id } = params

    // busca o Activity pelo Service
    const obj = await this.activityService.getActivityById(id)

    // retorna a mensagem de erro caso o Activity não exista
    if (!obj) {
      return response.status(404).json({ message: 'Atividade não encontrada.' })
    }

    // retorna o Activity caso ele exista
    return response.json(obj)
  }

  /**
   * Atualiza Activity específico no servidor
   */
  async update({ request, response, params }: HttpContext) {
    // desestrutura o id do Activity da requisição
    const { id } = params

    try {
      // valida as informações pelo Validator
      let payload = await activityValidator.validate(request.all())

      // atualiza as informações pelo Service
      let data = await this.activityService.updateActivity(id, payload.name)

      // retorna as atualizações realizadas
      return response.json({ ...data })
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      return response.status(409).json({ message: 'Erro ao atualizar atividade' })
    }
  }

  /**
   * Exclui um Activity específico
   */
  async destroy({ response, params }: HttpContext) {
    // desestrutura o id do Activity da requisição
    const { id } = params

    try {
      // deleta o Activity pelo Service
      await this.activityService.deleteActivity(id)

      // retorna status de sucesso: deletado
      return response.status(204)
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      return response.status(409).json({ message: 'Erro ao deletar atividade' })
    }
  }
}
