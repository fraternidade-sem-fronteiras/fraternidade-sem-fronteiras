import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'children'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('assisted_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('assisteds')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.date('birth_date').notNullable()
      table.string('living_with').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
