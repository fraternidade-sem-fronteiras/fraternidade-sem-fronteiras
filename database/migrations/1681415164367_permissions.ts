import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name').unique().notNullable()
      table.string('description').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
