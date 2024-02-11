import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import LevelPermission from './level_permission.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Volunteer from './volunteer.js'

export default class Level extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(() => LevelPermission)
  declare levelsPermission: HasMany<typeof LevelPermission>

  @hasMany(() => Volunteer)
  declare volunteers: HasMany<typeof Volunteer>
}
