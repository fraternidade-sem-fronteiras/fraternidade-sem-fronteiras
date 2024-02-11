import DrugService from '#services/drug_service'
import { createDrugValidator } from '#validators/drug'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DrugsController {
  constructor(readonly drugService: DrugService) {}
  public async index({ request, response }: HttpContext) {
    const search = request.input('search')
      ? decodeURIComponent((request.input('search') + '').replace(/\+/g, '%20'))
      : ''
    const page = request.input('page') ?? 1
    const perPage = request.input('perPage') ?? 20

    try {
      return response.json(await this.drugService.getDrugs(page, perPage, search))
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }
      throw error
    }
  }

  public async show({ response, params }: HttpContext) {
    const { search } = params

    try {
      return response.json(
        await this.drugService.getDrugByName(
          decodeURIComponent((search + '').replace(/\+/g, '%20'))
        )
      )
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }

  public async create({ request, response }: HttpContext) {
    try {
      // valida as informações pelo Validator
      let payload = await createDrugValidator.validate(request.all())

      // cria um Drug pelo Service
      let drug = await this.drugService.createDrug(payload.name)

      // retorna o Drug
      return response.status(201).json(drug)
    } catch (error) {
      // retorna a mensagem de erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }

  public async destroy({ request, response }: HttpContext) {
    const { id } = request.params()

    try {
      await this.drugService.deleteDrug(id)

      return response.status(200).json({ message: 'Drug deleted successfully' })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }
}
