import Level from './level.js'
import Permission from './permission.js'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class LevelPermission extends BaseModel {
  @column({ isPrimary: true })
  declare id_level: number

  @column({ isPrimary: true })
  declare id_permission: number

  @belongsTo(() => Level)
  declare level: BelongsTo<typeof Level>

  @belongsTo(() => Permission)
  declare permission: BelongsTo<typeof Permission>
}
