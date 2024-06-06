import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import RolePermission from './role_permission.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'crypto'
import RoleVolunteer from './role_volunteer.js'
import { PermissionDto } from './permission.js'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @hasMany(() => RolePermission)
  declare permissions: HasMany<typeof RolePermission>

  @hasMany(() => RoleVolunteer)
  declare volunteers: HasMany<typeof RoleVolunteer>

  @beforeCreate()
  public static async createUniqueId(role: Role) {
    role.id = randomUUID()
  }
}

export class RoleDto {
  id: string
  name: string
  permissions: string[] | PermissionDto[]

  constructor(role: Partial<RoleDto> | Role) {
    if (role.id) this.id = role.id
    if (role.name) this.name = role.name

    if (role instanceof Role) {
      this.permissions = PermissionDto.isPermissionDtoArray(role.permissions)
        ? role.permissions.map((perm) => PermissionDto.fromPartial(perm.permission))
        : role.permissions.map((perm) => perm.permission.id)
    }
  }

  hasPermission(permission: string) {
    if (!this.permissions || !this.permissions.length) return false
    if (PermissionDto.isPermissionDtoArray(this.permissions))
      return this.permissions.some(
        (perm: PermissionDto) =>
          perm.id === permission.toUpperCase() || perm.id === 'ALL'
      )
    return this.permissions.includes(permission.toUpperCase()) || this.permissions.includes('ALL')
  }

  static fromPartial(role: Partial<RoleDto> | Role): RoleDto {
    return new RoleDto(role)
  }
}
