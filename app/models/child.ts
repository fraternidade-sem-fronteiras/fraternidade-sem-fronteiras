import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Child extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare assistedId: string

  @column()
  declare name: string

  @column()
  declare birthDate: Date

  @column()
  declare livingWith: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
