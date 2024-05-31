import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'

export default class Gender extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeCreate()
  public static async createUniqueId(gender: Gender) {
    gender.id = randomUUID()
  }
}
