// fiz esse regex pra testar se é cpf, mas não sei se é o melhor jeito
// eu fiz todos, menos o primeiro, tendo a possiblidade de ser de 0,3 para que não houvesse problemas

import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import Assisted from '#models/assisted'
import { CreateAssistedDto } from '#validators/assisted'
import { PageResult } from '../utils/pageable.js'

// com o search sem ser um cpf
const cpfRegex = /[0-9]{2,3}([\.]?)[0-9]{0,3}([\.]?)[0-9]{0,3}([-]?)[0-9]{0,2}/
const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/

export default class AssistedService {
  /**
   * Criar um novo assistido
   *
   * @param name O nome do novo assistido
   * @returns
   */

  async createAssisted(createAssistedDto: CreateAssistedDto): Promise<Assisted> {
    return await Assisted.create(createAssistedDto)
  }

  /**
   * Deleta um assistido
   *
   * @param id O id do assistido a ser deletado
   */

  async deleteAssisted(id: string) {
    const assisted = await Assisted.query().where('id', id).preload('schooling').first()

    if (!assisted)
      throw new EntityNotFoundException('Assisted', 'O assistido ' + id + ' não foi encontrado!')

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
    const query = Assisted.query().preload('schooling').preload('gender')

    if (search) {
      console.log(search)
      if (uuidRegex.test(search)) {
        return await query.where('id', search).paginate(page, perPage)
      }

      if (cpfRegex.test(search)) {
        return await query.whereRaw(`BINARY cpf REGEXP '${search}'`).paginate(page, perPage)
      }

      return await query
        .whereRaw(`name REGEXP '^[${search}]'`)
        .orWhereRaw(`social_name REGEXP '^[${search}]'`)
        .paginate(page, perPage)
    }

    const assistedsPagination = await query.paginate(page, perPage)
    const assisteds = assistedsPagination.all()

    return PageResult.toResult(assisteds, {
      currentPage: page,
      itemsPerPage: perPage,
      totalPages: assistedsPagination.lastPage,
      totalItems: assistedsPagination.total,
    })
  }

  /**
   * Busca um assistido pelo nome, nome social ou cpf
   *
   * @param search
   * @returns
   */

  async getAssisted(search: string) {
    const query = Assisted.query().preload('schooling').preload('gender')

    if (uuidRegex.test(search)) {
      return await query.where('id', search).firstOrFail()
    }

    if (cpfRegex.test(search)) {
      return await query.whereRaw(`BINARY cpf REGEXP '${search}'`).firstOrFail()
    }

    return query
      .whereRaw(`name REGEXP '^[${search}]'`)
      .orWhereRaw(`social_name REGEXP '^[${search}]'`)
      .firstOrFail()
  }

  /**
   * Registrar informações do assistido
   *
   * @param id
   * @param name
   * @param ethnicy
   * @returns
   */

  async registerAssisted(id: string, name: string, ethnicy: string) {
    const assisted = await this.getAssistedById(id)

    assisted.merge({
      name: name,
      ethnicy: ethnicy,
      registered: true,
    })

    return assisted
  }

  async getAssistedById(id: string): Promise<Assisted> {
    return await Assisted.query()
      .where('id', id)
      .preload('schooling')
      .preload('gender')
      .firstOrFail()
  }

  /**
   * Busca um assistido pelo nome social
   * @param cpf
   * @returns
   */

  async getAssistedByCpf(cpf: string): Promise<Assisted> {
    return await Assisted.query()
      .where('cpf', cpf)
      .preload('schooling')
      .preload('gender')
      .firstOrFail()
  }
}
