import Role, {
  hasPermission as hasRolePermission,
  hasAtLeastOnePermission as hasAtLeastOneRolePermission,
} from './role.entity.js'

export default interface Volunteer {
  id: number

  name: string
  email: string

  avatarUrl?: string

  roles: Role[]
  createdAt: Date

  registered: boolean
}

export interface StoreableVolunteer extends Volunteer {
  token: string
  expiresAt: number
}

export function hasPermission(
  volunteer: Volunteer | undefined | null,
  permission: string | string[]
): boolean {
  if (!volunteer) return false
  return volunteer.roles.some((role) => hasRolePermission(role, permission))
}

export function hasAtLeastOnePermission(
  volunteer: Volunteer | undefined | null,
  permission: string[]
): boolean {
  if (!volunteer) return false
  return volunteer.roles.some((role) => hasAtLeastOneRolePermission(role, permission))
}
