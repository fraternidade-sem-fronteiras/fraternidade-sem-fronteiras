import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import RolePermission from './role_permission.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Volunteer from './volunteer.js'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare name: string

  @hasMany(() => RolePermission)
  declare permissions: HasMany<typeof RolePermission>

  @hasMany(() => Volunteer)
  declare volunteers: HasMany<typeof Volunteer>
}

export interface RoleDto {
  name: string
  permissions: string[]
}
