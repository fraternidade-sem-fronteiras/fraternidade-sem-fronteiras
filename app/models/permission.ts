import RolePermission from './role_permission.js'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare name: string

  @hasMany(() => RolePermission)
  declare rolePermissions: HasMany<typeof RolePermission>
}

export interface PermissionDto {
  name: string
}
