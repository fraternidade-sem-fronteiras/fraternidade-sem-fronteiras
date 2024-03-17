import hash from '@adonisjs/core/services/hash'
import RoleVolunteer from './role_volunteer.js'
import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Role, { RoleDto } from './role.js'

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
  declare registered: boolean

  @hasMany(() => RoleVolunteer)
  declare roles: HasMany<typeof RoleVolunteer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  public static async hashPassword(volunteer: Volunteer) {
    if (volunteer.$dirty.password) {
      const newPassword = await hash.make(volunteer.password)
      volunteer.password = newPassword
    }
  }
}

export interface VolunteerDto {
  id: number
  name: string
  email: string
  roles: RoleDto[]
  registered?: boolean
  createdAt: string
}
