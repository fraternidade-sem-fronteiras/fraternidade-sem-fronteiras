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
    return response.json(roles)
  }

  async show({ request, response }: HttpContext) {
    const id = decodeURI(request.param('id'))

    const role = await this.roleService.getRoleById(id)

    if (!role)
      throw new EntityNotFoundException('Roles', 'O cargo de ID ' + id + ' não foi encontrado!')

    return response.json(role)
  }

  async store({ request, response }: HttpContext) {
    const { name, permissions } = await createRoleValidator.validate(request.body())

    const role = await this.roleService.createRole(name, permissions, request.all().user!)

    return response.json(role)
  }

  async destroy({ request, response }: HttpContext) {
    const id = decodeURI(request.param('id'))

    await this.roleService.deleteRoleById(id)

    return response.status(204)
  }
}
