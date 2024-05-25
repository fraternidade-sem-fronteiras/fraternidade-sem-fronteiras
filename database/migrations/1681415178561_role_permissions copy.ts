import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .string('role_name')
        .notNullable()
        .references('name')
        .inTable('roles')
        .onDelete('CASCADE')
      table
        .string('permission_name')
        .notNullable()
        .references('name')
        .inTable('permissions')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
