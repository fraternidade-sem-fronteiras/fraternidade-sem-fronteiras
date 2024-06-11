import RolePermission from './role_permission.js'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @hasMany(() => RolePermission)
  declare rolePermissions: HasMany<typeof RolePermission>
}

export class PermissionDto {
  id: string
  name: string
  description: string

  constructor(permission: Partial<PermissionDto> | Permission) {
    if (permission.id) this.id = permission.id
    if (permission.name) this.name = permission.name
    if (permission.description) this.description = permission.description
  }

  static fromPartial(permission: Partial<PermissionDto> | Permission): PermissionDto {
    return new PermissionDto(permission)
  }

  static isPermissionDtoArray(permission?: any[]): permission is PermissionDto[] {
    if (!permission) return false

    return permission.every((perm) => PermissionDto.isPermissionDto(perm))
  }

  static isPermissionDto(permission?: any): permission is PermissionDto {
    return permission && permission.id && permission.name && permission.description
  }
}
