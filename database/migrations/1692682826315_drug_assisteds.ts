import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'drug_assisteds'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.uuid('assisted_id').references('id').inTable('assisteds').onDelete('CASCADE')
      table.uuid('drug_id').references('id').inTable('drugs').onDelete('CASCADE')

      table.dateTime('start_time').nullable()
      table.integer('frequency').nullable()

      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
