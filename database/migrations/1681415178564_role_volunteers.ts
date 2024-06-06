import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_volunteers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('role_id').notNullable().references('id').inTable('roles').onDelete('CASCADE')
      table
        .uuid('volunteer_id')
        .notNullable()
        .references('id')
        .inTable('volunteers')
        .onDelete('CASCADE')
      table.unique(['role_id', 'volunteer_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
