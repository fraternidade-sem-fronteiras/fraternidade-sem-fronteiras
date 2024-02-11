import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'level_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('level_id')
        .primary()
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('levels')
      table
        .integer('permission_id')
        .primary()
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('permissions')

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
