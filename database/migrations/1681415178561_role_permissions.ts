import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('role_id').notNullable().references('id').inTable('roles').onDelete('CASCADE')
      table
        .string('permission_id')
        .notNullable()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
      table.unique(['role_id', 'permission_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
