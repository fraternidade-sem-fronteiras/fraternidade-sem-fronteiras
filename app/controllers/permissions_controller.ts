import PermissionService from '#services/permission_service'
import { createPermissionValidator } from '#validators/permission'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PermissionsController {
  constructor(readonly permissionService: PermissionService) {}

  async index({ response }: HttpContext) {
    const permissions = await this.permissionService.getPermissions()
    return response.json(permissions)
  }

  async store({ request, response }: HttpContext) {
    const { name } = await createPermissionValidator.validate(request.body())

    const permission = await this.permissionService.createPermission(name)

    return response.json(permission)
  }

  async getRolesByPermission({ request, response }: HttpContext) {
    const id = decodeURI(request.param('id'))

    const roles = await this.permissionService.getRolesByPermission(id)
    return response.json(roles)
  }
}
