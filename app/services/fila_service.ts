import ConflictException from '#exceptions/conflict_exception'
import Fila from '#models/fila'
import { CreateFila } from '#validators/fila'
import { PageResult } from '../utils/pageable.js'

const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/

export default class FilaService {

    /**
   * Busca diversos assistidos pelo nome, nome social ou cpf
   *
   * @param page A página atual
   * @param perPage A quantidade de assistidos por página
   * @param search O nome, id
   * @returns
   */

    async getAssistedsFila(page: number, perPage: number, search: string | null) {
      const query = Fila.query().preload('assistedID')
  
      if (search) {
        console.log(search)
        if (uuidRegex.test(search)) {
          return await query.where('id', search).paginate(page, perPage)
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
   * Busca um assistido pelo nome, nome social 
   *
   * @param search
   * @returns
   */

  async getAssistedFila(search: string) {
    const query = Fila.query().preload('assistedID')

    if (uuidRegex.test(search)) {
      return await query.where('id', search).firstOrFail()
    }

    return query
      .whereRaw(`name REGEXP '^[${search}]'`)
      .orWhereRaw(`social_name REGEXP '^[${search}]'`)
      .firstOrFail()
  }

  
  /**
   * Para registrar um novo assistido na fila criada
   *
   * @param name Nome da nova droga
   * @returns
   */
  async createFila(createFilaTo: CreateFila): Promise<Fila> {
    return await Fila.create(createFilaTo)
  }

 
}
