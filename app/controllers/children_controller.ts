import ChildService from '#services/child_service'
import { createChildValidator } from '#validators/child'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ChildrenController {
  constructor(readonly childService: ChildService) {}
  /**
   * Criar um novo filho
   */
  public async create({ request, response }: HttpContext) {
    try {
      // validator possibilita validar as informações
      let payload = await createChildValidator.validate(request.all())

      const { assistedId, name, birthDate, livingWith } = payload

      // cria um novo filho
      this.childService.createChild(
        assistedId,
        name,
        new Date(Date.parse(birthDate.toString())),
        livingWith
      )

      // retorna o status 201 (created) e a mensagem de sucesso
      return response
        .status(201)
        .json({ message: 'O filho ' + name + ' foi registrado com sucesso!' })
    } catch (error) {
      // retorna a mensagem de erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      return response.status(409).json({ message: 'Erro ao criar filho' })
    }
  }

  public async index({ response, params }: HttpContext) {
    const { id } = params

    try {
      const children = await this.childService.getChildsById(id)

      return response.status(200).json(children)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }

  public async show({ response, params }: HttpContext) {
    const { id, name } = params

    try {
      const children = await this.childService.getChildByName(id, name)

      return response.status(200).json(children)
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }

  public async destroy({ response, params }: HttpContext) {
    const { id, name } = params

    try {
      await this.childService.deleteChildByName(id, name)

      return response.status(200).json({ message: 'O filho foi deletado com sucesso!' })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }
}
