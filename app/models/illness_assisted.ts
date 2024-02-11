import Assisted from './assisted.js'
import Illness from './illness.js'
import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class IllnessAssisted extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare assistedId: number

  @column()
  declare illnessId: number

  @column()
  declare placeMedicalCare: string | null

  @column()
  declare remarks: string | null

  @column()
  declare alreadyTreated: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Assisted)
  declare assisted: HasOne<typeof Assisted>

  @hasOne(() => Illness)
  declare illness: HasOne<typeof Illness>
}
