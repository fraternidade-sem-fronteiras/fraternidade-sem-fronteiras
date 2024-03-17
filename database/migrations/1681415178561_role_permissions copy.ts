import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .string('role_name')
        .primary()
        .notNullable()
        .references('name')
        .inTable('roles')
      table
        .string('permission_name')
        .primary()
        .notNullable()
        .references('name')
        .inTable('permissions')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
