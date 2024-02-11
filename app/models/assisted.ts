import Gender from './gender.js'
import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import MaritalStatus from './marital_status.js'

export default class Assisted extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  /**
   * Nome social
   */
  @column()
  declare socialName: string | null

  /**
   * Data de nascimento
   */
  @column() // conferir se cria com data e hora (o que não queremos)
  declare dateBirth: DateTime | null

  /**
   * Etnia
   */
  @column() // talvez seja necessário criar uma entidade
  declare ethnicy: string | null

  /**
   * Gênero (Chave estrangeira de Gender)
   */
  @column()
  declare genderId: number | null

  /**
   * Nome do pai
   */
  @column()
  declare father: string | null

  /**
   * Nome da mãe
   */
  @column()
  declare mother: string | null

  /**
   * País
   */
  @column()
  declare country: string | null

  /**
   * Estado
   */
  @column()
  declare state: string | null

  /**
   * Cidade
   */
  @column()
  declare city: string | null

  /**
   * Estado civil (Chave estrangeira de MaritalStatus)
   */
  @column()
  declare maritalStatusId: number | null

  /**
   * CPF
   */
  @column()
  declare cpf: string | null

  /**
   * RG
   */
  @column()
  declare rg: string | null

  /**
   * Emissão do RG
   */
  @column()
  declare emission: DateTime | null

  /**
   * Orgão de emissão do RG
   */
  @column()
  declare organ: string | null

  /**
   * Carteira de Trabalho e Previdência Social (CTPS)
   */
  @column()
  declare ctps: string | null

  /**
   * Objetivos do assistido ao entrar na ONG
   */
  @column()
  declare objectives: string | null

  /**
   * Certificado de Nascimento / Casamento
   */
  @column()
  declare certification: string | null

  /**
   * Data em que entrou em situação de rua
   */
  @column() // conferir se cria com data e hora (o que não queremos)
  declare dateStreet: DateTime | null

  /**
   * Motivos para estar em situação de rua
   */
  @column()
  declare reasons: string | null

  /**
   * Lugar onde pernoita
   */
  @column()
  declare place: string | null

  /**
   * Escolaridade
   */
  @column()
  declare schooling: string | null

  /**
   * Renda
   */
  @column()
  declare income: number | null

  /**
   * Necessidades especiais
   */
  @column()
  declare specialNeeds: string | null

  /**
   * Alerta de pessoa expulsa da ONG
   */
  @column()
  declare disciplinaryAlert: boolean | null

  /**
   * Alerta de pessoa desaparecida
   */
  @column()
  declare missedAlert: boolean | null

  /**
   * Observações
   */
  @column()
  declare remarks: string | null

  /**
   * Flag de cadastro completado
   */
  @column()
  declare registered: boolean

  @hasOne(() => Gender)
  declare gender: HasOne<typeof Gender>

  @hasOne(() => MaritalStatus)
  declare maritalSatus: HasOne<typeof MaritalStatus>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
