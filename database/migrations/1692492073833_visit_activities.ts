import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'visit_activities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('visit_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('visits')
        .onDelete('CASCADE')
      table.uuid('activity_id').notNullable().unsigned().references('id').inTable('activities')

      table.primary(['visit_id', 'activity_id'])
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
