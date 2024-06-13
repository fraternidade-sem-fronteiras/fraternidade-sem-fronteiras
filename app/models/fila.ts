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

  @column()
  declare name: string

  /** 
  * ID do usuário que está na fila vinculado ao seu cadastro
  */
  @column({}) // Deve fazer a ligação com a tabela de assistidos
  declare assistedId: number | null

  @belongsTo(() => Assisted)
  declare assistedID: BelongsTo<typeof Assisted>

  /**
  * Nome social
  */
  @column()
  declare socialName: string | null

  @column()
  declare registered: boolean
  
  @column()
  declare served: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}