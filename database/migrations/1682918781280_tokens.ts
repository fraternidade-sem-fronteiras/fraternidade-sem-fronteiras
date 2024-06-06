import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('token', 256).notNullable().unique()
      table
        .uuid('volunteer_id')
        .notNullable()
        .references('id')
        .inTable('volunteers')
        .onDelete('CASCADE')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('expires_at', { useTz: true }).notNullable()
      table.dateTime('created_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
