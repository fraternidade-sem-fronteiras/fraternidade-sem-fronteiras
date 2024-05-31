import RolePermission from './role_permission.js'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'crypto'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @hasMany(() => RolePermission)
  declare rolePermissions: HasMany<typeof RolePermission>

  @beforeCreate()
  public static async createUniqueId(permission: Permission) {
    permission.id = randomUUID()
  }
}

export interface PermissionDto {
  name: string
}
