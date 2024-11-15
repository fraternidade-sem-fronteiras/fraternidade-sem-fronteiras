import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fila_managers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("fila_id").unsigned().references("id").inTable("filas").onDelete("CASCADE").notNullable()
      table.string('name').notNullable()
      table.uuid("assisted_id").references("id").inTable("assisteds").onDelete("CASCADE")
      table.boolean('registered')
      table.boolean('served')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}