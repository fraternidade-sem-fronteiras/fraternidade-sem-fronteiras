import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Visit from './visit.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Activity from './activity.ts'

export default class VisitActivity extends BaseModel {
  @column({ isPrimary: true })
  declare visitId: number

  @column({ isPrimary: true })
  declare activityId: number

  @belongsTo(() => Visit)
  declare visit: BelongsTo<typeof Visit>

  @belongsTo(() => Activity)
  declare activity: BelongsTo<typeof Activity>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
