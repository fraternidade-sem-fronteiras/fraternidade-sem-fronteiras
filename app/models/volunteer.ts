import Level from './level.js'
import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'

export default class Volunteer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare levelId: number

  @hasOne(() => Level)
  declare level: HasOne<typeof Level>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  public static async hashPassword(volunteer: Volunteer) {
    if (volunteer.$dirty.password) {
      console.log(volunteer.$dirty.password)
      const newPassword = await hash.make(volunteer.password)
      console.log(newPassword)
      volunteer.password = newPassword
    }
  }
}
