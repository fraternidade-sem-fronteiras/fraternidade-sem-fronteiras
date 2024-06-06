import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import { RoleDto } from './role.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'crypto'
import RoleVolunteer from './role_volunteer.js'

export default class Volunteer extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare avatarUrl?: string

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

  @beforeCreate()
  public static async createUniqueId(volunteer: Volunteer) {
    volunteer.id = randomUUID()
  }
}

export class VolunteerDto {
  id: string
  name: string
  email: string
  roles: RoleDto[]
  registered?: boolean
  createdAt: DateTime

  constructor(volunteer: Partial<VolunteerDto>) {
    Object.assign(this, volunteer)
  }

  hasPermission(permission: string): boolean {
    return this.roles.some((role) =>
      role.permissions.map((str) => str.toLowerCase()).includes(permission.toLowerCase())
    )
  }

  static fromPartial(volunteer: Partial<VolunteerDto>): VolunteerDto {
    return new VolunteerDto(volunteer)
  }
}
