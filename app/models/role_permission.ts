import Role from './role.js'
import Permission from './permission.js'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RolePermission extends BaseModel {
  @column({ isPrimary: true })
  declare roleId: string

  @column({ isPrimary: true })
  declare permissionId: string

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Permission)
  declare permission: BelongsTo<typeof Permission>
}
