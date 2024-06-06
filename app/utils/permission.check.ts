import ForbiddenException from '#exceptions/forbidden_exception'
import { RoleDto } from '#models/role'
import { HttpContext } from '@adonisjs/core/http'

export function hasPermission(
  request: HttpContext['request'],
  permission: string,
  message?: string
): boolean {
  const user = request.all().user

  if (!user || !user.roles?.some((role: RoleDto) => role.hasPermission(permission))) {
    throw new ForbiddenException(message)
  }

  return true
}
