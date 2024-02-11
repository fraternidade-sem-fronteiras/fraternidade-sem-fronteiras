import Assisted from './assisted.js'
import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Drug from './drug.js'

export default class DrugAssisted extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare assistedId: number

  @column()
  declare drugId: number

  @column()
  declare startTime: DateTime | null

  @column()
  declare frequency: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Drug)
  declare drug: HasOne<typeof Drug>

  @hasOne(() => Assisted)
  declare assisted: HasOne<typeof Assisted>
}