import MedicineService from '#services/medicine_service'
import { createMedicineValidator } from '#validators/medicine'
import type { HttpContext } from '@adonisjs/core/http'

export default class MedicinesController {
  constructor(readonly medicineService: MedicineService) {}

  async index({ request, response }: HttpContext) {
    const search = request.input('search')
      ? decodeURIComponent((request.input('search') + '').replace(/\+/g, '%20'))
      : ''
    const page = request.input('page') ?? 1
    const perPage = request.input('perPage') ?? 20

    try {
      return response.json(await this.medicineService.getMedicines(page, perPage, search))
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }

  async show({ response, params }: HttpContext) {
    const { search } = params

    try {
      return response.json(
        await this.medicineService.getMedicineByName(
          decodeURIComponent((search + '').replace(/\+/g, '%20'))
        )
      )
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }

      throw error
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      // valida as informações pelo Validator
      let payload = await createMedicineValidator.validate(request.all())

      // cria um Medicine pelo Service
      let medicine = await this.medicineService.createMedicine(payload.name)

      // retorna o Medicine
      return response.status(201).json(medicine)
    } catch (error) {
      // retorna a mensagem de erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(409).json({ message: error.message })
      }

      throw error
    }
  }

  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()

    try {
      await this.medicineService.deleteMedicine(id)

      return response.status(200).json({ message: 'Medicine deleted successfully' })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }
}
