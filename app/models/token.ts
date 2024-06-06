import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Volunteer from '#models/volunteer'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare token: string

  @column()
  declare volunteerId: string

  @hasOne(() => Volunteer)
  declare volunteer: HasOne<typeof Volunteer>

  @column.dateTime()
  declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeCreate()
  public static async createUniqueId(volunteer: Volunteer) {
    volunteer.id = randomUUID()
  }
}
