import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_volunteers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('role_name').primary().notNullable().references('name').inTable('roles')
      table
        .integer('volunteer_id')
        .primary()
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('volunteers')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
