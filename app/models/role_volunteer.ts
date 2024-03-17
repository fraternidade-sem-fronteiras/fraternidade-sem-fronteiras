import Role from './role.js'
import Volunteer from './volunteer.js'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RoleVolunteer extends BaseModel {
  @column({ isPrimary: true })
  declare roleName: string

  @column({ isPrimary: true })
  declare volunteerId: number

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => Volunteer)
  declare volunteer: BelongsTo<typeof Volunteer>
}
