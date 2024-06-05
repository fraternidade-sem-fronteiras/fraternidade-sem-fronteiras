import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import RolePermission from './role_permission.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Volunteer from './volunteer.js'
import { randomUUID } from 'crypto'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @hasMany(() => RolePermission)
  declare permissions: HasMany<typeof RolePermission>

  @hasMany(() => Volunteer)
  declare volunteers: HasMany<typeof Volunteer>

  @beforeCreate()
  public static async createUniqueId(role: Role) {
    role.id = randomUUID()
  }
}

export interface RoleDto {
  id: string
  name: string
  permissions: string[]
}
