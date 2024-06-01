import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import Assisted from './assisted.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Schooling extends BaseModel {
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
  public static async createUniqueId(schooling: Schooling) {
    schooling.id = randomUUID()
  }
}
