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

    async getPageFila(page: number, perPage: number, search: string | null) {
      const query =  Fila.query()
      
      if (search) {
        console.log(search)
        if (uuidRegex.test(search)) {
          return await query.where('id', search).paginate(page, perPage)
        }
  
       
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
    if (uuidRegex.test(search)) {
      return await Fila.query().where('id', search).firstOrFail()
    }
  }
  async updateCloseFila(id: number, validation: boolean): Promise<any> {
    
      let fila = await Fila.findByOrFail('id', id)
      fila.active = validation
      await fila.save()

      return {
        id: fila.id,
        updated: [
          {
            fieldStatusServed: 'fechado',
            newValue: fila.active,
          },
        ],
      }
    }
  /**
   * Para registrar um novo assistido na fila criada
   *
   * 
   */
  async createFila(createFilaTo: CreateFila) {

    const busca = await Fila.findBy('active', true)
    if(busca != null){
      busca.capacity = -1
      return busca
    }
    return await Fila.create(createFilaTo)
  }


  async deleteFila(id: number) {
    let fila = await Fila.findBy('id', id)

    if (!fila) {
      throw new Error('Contato não encontrado')
    }

    await fila.delete()
  }
}