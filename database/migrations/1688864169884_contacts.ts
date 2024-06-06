import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .uuid('assisted_id')
        .notNullable()
        .references('id')
        .inTable('assisteds')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('kinship').notNullable()
      table.string('phone')
      table.string('email')
      table.string('other')

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
