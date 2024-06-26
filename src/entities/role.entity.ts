export default interface Role {
  id: string
  name: string
  permissions: string[]
}

export function hasSuperPermission(role: Role): boolean {
  return role.permissions.includes('ALL')
}

export function hasPermission(role: Role, permission: string | string[]): boolean {
  if (hasSuperPermission(role)) return true
  return Array.isArray(permission)
    ? permission.every((perm) => role.permissions.includes(perm))
    : role.permissions.includes(permission)
}

export function hasAtLeastOnePermission(role: Role, permission: string[]): boolean {
  if (hasSuperPermission(role)) return true
  return permission.some((perm) => role.permissions.includes(perm))
}
