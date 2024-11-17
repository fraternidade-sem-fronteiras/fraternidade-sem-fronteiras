import ConflictException from '#exceptions/conflict_exception'
import Fila from '#models/fila'
import { CreateFila } from '#validators/fila'
import { PageResult } from '../utils/pageable.js'
import { DateTime } from 'luxon'
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
  async updateCloseFila(id: number): Promise<any> {
    
      let fila = await Fila.findByOrFail('id', id)
      fila.active = false
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

    const filaAtiva = await Fila.findBy('active', true)
    const ultimaFila = await Fila.query().orderBy('created_at', 'desc').first()
    if(filaAtiva != null){
      filaAtiva.capacity = -1
      return filaAtiva
    }
    console.log('last_row',ultimaFila)
    if (ultimaFila) {
      console.log('loop')
      const diferFilas = DateTime.now().diff(DateTime.fromJSDate(ultimaFila.updatedAt.toJSDate()), 'hours').hours
      if (diferFilas < 4) {
        throw new Error('A última fila foi fechada há menos de 4 horas')
      }
    }

    return await Fila.create(createFilaTo)
  }


  async deleteFila(id: number) {
    let fila = await Fila.findBy('id', id)

    if (!fila) {
      throw new Error('fila não encontrada')
    }

    await fila.delete()
  }
}