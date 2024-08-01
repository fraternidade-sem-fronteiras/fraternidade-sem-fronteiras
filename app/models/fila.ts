import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Assisted from './assisted.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Fila extends BaseModel {
  /**
  * Esse ID é primário à lista  
  */
  @column({ isPrimary: true })
  declare id: number

  //Campo que indica a quantidade de pessoas que a fila pode ter
  @column()
  declare capacity: number

  //Campo que indica se a fila está fechada ou não
  @column()
  declare active: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}