import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Assisted from './assisted.js'

export default class State extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare default: boolean

  @hasMany(() => Assisted)
  declare assisteds: HasMany<typeof Assisted>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @beforeCreate()
  public static async createUniqueId(country: State) {
    country.id = randomUUID()
  }
}
