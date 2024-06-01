import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'assisteds'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('social_name')
      table.date('date_birth')
      table.string('ethnicy')
      table.uuid('gender_id').references('id').inTable('genders')
      table.string('father')
      table.string('mother')
      table.string('country')
      table.string('state')
      table.string('city')
      table.uuid('marital_status_id').references('id').inTable('marital_statuses')
      table.string('cpf').unique()
      table.string('rg').unique()
      table.date('emission')
      table.string('organ')
      table.string('ctps')
      table.string('objectives')
      table.string('certification')
      table.date('date_street')
      table.string('reasons')
      table.string('place')
      table.uuid('schooling_id').references('id').inTable('schoolings')
      table.float('income')
      table.string('special_needs')
      table.boolean('disciplinary_alert')
      table.boolean('missed_alert')
      table.string('remarks')
      table.boolean('registered').defaultTo(false)

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
