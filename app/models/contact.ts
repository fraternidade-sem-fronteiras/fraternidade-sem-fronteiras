import Assisted from './assisted.js'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({})
  declare assistedId: number

  @column({})
  declare name: string

  @column({})
  declare kinship: string

  @column({})
  declare phone: string | null

  @column({})
  declare email: string | null

  @column({})
  declare other: string | null

  @belongsTo(() => Assisted)
  declare assisted: BelongsTo<typeof Assisted>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}