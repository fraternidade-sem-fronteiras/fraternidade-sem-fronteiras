import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Assisted from './assisted.js'

export default class Visit extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  /**
   * Data da visita
   */
  @column.dateTime({})
  declare dateVisit: DateTime

  /**
   * Id do assistido
   */
  @column({})
  declare assistedId: string

  /**
   * Se foi atendido ou não
   */
  @column({})
  declare attended: boolean

  /**
   * Descrição da visita, alguma observação que o voluntário queira colocar
   */
  @column({})
  declare description: string | null

  @belongsTo(() => Assisted)
  declare assisted: BelongsTo<typeof Assisted>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
