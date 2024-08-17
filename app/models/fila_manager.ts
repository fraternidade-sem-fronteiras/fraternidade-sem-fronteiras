import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Assisted from './assisted.js'
import Fila from './fila.js'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class FilaManager extends BaseModel {
  [x: string]: any
  /**
  * Esse ID é primário à lista  
  */
  @column({ isPrimary: true })
  declare id: number

  @column({}) // Deve fazer a ligação com a tabela de filas
  declare filaId: number 

  @belongsTo(() => Fila)
  declare filaID: BelongsTo<typeof Fila>
  /** 
  * ID do usuário que está na fila vinculado ao seu cadastro
  */
 
  @column()
  declare name: string

  @column({}) // Deve fazer a ligação com a tabela de assistidos
  declare assistedId: number | null

  @belongsTo(() => Assisted)
  declare assistedID: BelongsTo<typeof Assisted>
  
  @column()
  declare registered: boolean
  
  @column()
  declare served: boolean

  /* 
  Teste de correção de erro
  
  @column()
  declare total: number
  */

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}