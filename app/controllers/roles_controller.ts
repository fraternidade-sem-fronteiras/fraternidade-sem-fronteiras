import LevelService from '#services/role_service'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class RolesController {
  constructor(readonly roleService: LevelService) {}

  async index({ response }: HttpContext) {
    const roles = await this.roleService.getRoles()

    if (!roles.length) throw new EntityNotFoundException('No roles found')

    return response.json(roles)
  }
}
