import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'illness_assisteds'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .uuid('assisted_id')
        .references('id')
        .inTable('assisteds')
        .onDelete('CASCADE')

      table
        .integer('illness_id')
        .unsigned()
        .references('id')
        .inTable('illnesses')
        .onDelete('CASCADE')
      table.string('place_medical_care').nullable()
      table.string('remarks').nullable()
      table.string('already_treated').nullable()

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
