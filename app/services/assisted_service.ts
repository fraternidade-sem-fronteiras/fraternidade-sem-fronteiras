// fiz esse regex pra testar se é cpf, mas não sei se é o melhor jeito
// eu fiz todos, menos o primeiro, tendo a possiblidade de ser de 0,3 para que não houvesse problemas

import ConflictException from '#exceptions/conflict_exception'
import Assisted from '#models/assisted'

// com o search sem ser um cpf
const cpfRegex = /[0-9]{2,3}([\.]?)[0-9]{0,3}([\.]?)[0-9]{0,3}([-]?)[0-9]{0,2}/
export default class AssistedService {
  /**
   * Criar um novo assistido
   *
   * @param name O nome do novo assistido
   * @returns
   */

  async createAssisted(data: Partial<Assisted> & { name: string }): Promise<Assisted> {
    return Assisted.create(data)
  }

  /**
   * Deleta um assistido
   *
   * @param id O id do assistido a ser deletado
   */

  async deleteAssisted(id: number) {
    const assisted = await Assisted.query().where('id', id).firstOrFail()

    await assisted.delete()
  }

  /**
   * Busca diversos assistidos pelo nome, nome social ou cpf
   *
   * @param page A página atual
   * @param perPage A quantidade de assistidos por página
   * @param search O nome, nome social ou cpf do assistido
   * @returns
   */

  async getAssisteds(page: number, perPage: number, search: string | null) {
    if (search) {
      if (cpfRegex.test(search)) {
        return await Assisted.query()
          .whereRaw(`BINARY cpf REGEXP '${search}'`)
          .paginate(page, perPage)
      } else {
        return await Assisted.query()
          .whereRaw(`name REGEXP '^[${search}]'`)
          .orWhereRaw(`social_name REGEXP '^[${search}]'`)
          .paginate(page, perPage)
      }
    }

    return await Assisted.query().paginate(page, perPage)
  }

  /**
   * Busca um assistido pelo nome, nome social ou cpf
   *
   * @param search
   * @returns
   */

  async getAssisted(search: string) {
    if (cpfRegex.test(search)) {
      return await Assisted.query().whereRaw(`BINARY cpf REGEXP '${search}'`).firstOrFail()
    } else {
      return await Assisted.query()
        .whereRaw(`name REGEXP '^[${search}]'`)
        .orWhereRaw(`social_name REGEXP '^[${search}]'`)
        .firstOrFail()
    }
  }

  /**
   * Registrar informações do assistido
   *
   * @param id
   * @param name
   * @param ethnicy
   * @returns
   */

  async registerAssisted(id: number, name: string, ethnicy: string) {
    const assisted = await this.getAssistedById(id)

    assisted.merge({
      name: name,
      ethnicy: ethnicy,
      registered: true,
    })

    return assisted
  }

  async getAssistedById(id: number): Promise<Assisted> {
    return await Assisted.findByOrFail('id', id)
  }

  /**
   * Busca um assistido pelo nome social
   * @param cpf
   * @returns
   */

  async getAssistedByCpf(cpf: string): Promise<Assisted> {
    return await Assisted.query().where('cpf', cpf).firstOrFail()
  }
}
