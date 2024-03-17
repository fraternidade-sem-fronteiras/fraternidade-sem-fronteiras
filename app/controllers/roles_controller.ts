import RoleService from '#services/role_service'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createRoleValidator } from '#validators/role'

@inject()
export default class RolesController {
  constructor(readonly roleService: RoleService) {}

  async index({ response }: HttpContext) {
    const roles = await this.roleService.getRoles()

    if (!roles.length) throw new EntityNotFoundException('No roles found')

    return response.json(roles)
  }

  async store({ request, response }: HttpContext) {
    const { name, permissions } = await createRoleValidator.validate(request.body())

    const role = await this.roleService.createRole(name, permissions)

    return response.json(role)
  }

  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()

    console.log(id)
    return
    await this.roleService.deleteRole(id)

    return response.status(204)
  }
}
