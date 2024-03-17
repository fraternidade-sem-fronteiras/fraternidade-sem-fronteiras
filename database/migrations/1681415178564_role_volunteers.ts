import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_volunteers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .string('role_name')
        .notNullable()
        .references('name')
        .inTable('roles')
        .onDelete('CASCADE')
      table
        .integer('volunteer_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('volunteers')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
