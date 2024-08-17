import ConflictException from '#exceptions/conflict_exception'
import Fila_manager from '#models/fila_manager'
import Fila from '#models/fila'

import Assisted from '#models/assisted'
import { CreateFilaManager } from '#validators/fila_manager'
import { PageResult } from '../utils/pageable.js'
import { error } from 'console'

const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/

export default class FilaManagerService {

    /**
   * Busca diversos assistidos pelo nome, nome social ou cpf
   *
   * @param page A página atual
   * @param perPage A quantidade de assistidos por página
   * @param search O nome, id
   * @returns
   */
    async getPagesAssistedsFila(page: number, perPage: number, search: string | null, filaId: string) {
      const query = Fila_manager.query().preload('assistedID')
	  
	  if (filaId){
		query.where('fila_id', filaId)
	  }
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

  async getAssistedFila(search: string, filaId: string) {
    const query = Fila_manager.query().preload('assistedID')
	
	if (filaId){
		query.where('fila_id', filaId)
	  }

    if (uuidRegex.test(search)) {
      return await query.where('id', search).firstOrFail()
    }

    return query
      .whereRaw(`name REGEXP '^[${search}]'`)
      .orWhereRaw(`social_name REGEXP '^[${search}]'`)
      .firstOrFail()
  }

  async updateStatusAssisted(id: number, filaId: number, validation: boolean): Promise<any> {
    const query = Fila_manager.query().preload('assistedID')
	
    if (filaId){
      query.where('fila_id', filaId)
      }
      
      let fila = await Fila_manager.findByOrFail('id', id)
      let assisted = await Assisted.findBy('id', fila.assistedID)
  
      let oldValueStatusServed = fila.served
      fila.served = validation
      await fila.save()
  
      if(validation && assisted != null ){ // se a pessoa foi atendida, e ela tem cadastro na tabela assistido
        if (assisted.servedNum != null) { // se o assistido já foi atendido alguma vez, incremente em 1
          let oldValueQtdServed = assisted.servedNum
          assisted.servedNum = oldValueQtdServed + 1
          await assisted.save()
        }
      else{ // se ele nunca foi atendido, ponha como 1
      assisted.servedNum = 1
      await assisted.save()
      }
    }
  
      return {
        id: fila.id,
        updated: [
          {
            fieldStatusServed: 'Served',
            oldValue: oldValueStatusServed,
            newValue: fila.served,
          },
        ],
      }
    }
  /**
   * Para registrar um novo assistido na fila criada
   *
   * @param filaId fila que o assistido identificado pelo  @param AssistedId fez parte
   * @returns
   */

  async createAssistedInFila(createFilaTo: CreateFilaManager): Promise<any> {

    interface CountResultado {
      total: number;
    }

    // Extraindo os campos do objeto validated data
    const { filaId, name, assistedId, registered, served } = createFilaTo;

    if (filaId && assistedId) {
      const searchAssisted = await Fila_manager.query().where("fila_id", filaId).andWhere("assisted_id", assistedId).first();
		
      if(searchAssisted != null){
        return{
            message: "pessoa já cadastrada nessa fila",
          }
        
      }
    }
    let fila = await Fila.findByOrFail("id", filaId)  
	  //const count = await Fila_manager.query().where("fila_id", filaId).count('* as total');
    const count = await Fila_manager.query().where("fila_id", filaId).count('* as total') as unknown as CountResultado[];
    const total = count[0].total

    if(total >= fila.capacity){
      return{ message: "Fila cheia. não há mais vagas", }
    }
    
    // Criando a nova instância na tabela 'Fila'
    return await Fila_manager.create({
      filaId: filaId,      // Certifique-se de usar o campo correto que corresponde ao nome na tabela do banco de dados
      name: name,
      assistedId: assistedId, // Novamente, use o nome do campo correto
      registered: registered,
      served: false,
    });
}
 
  /**async registerAssistedFila(filaId: string, assistedId: string, name: string, ethnicy: string) {
    const assistedInFila = await this.getAssistedById(i)

    assistedInFila.merge({
      name: name,
      ethnicy: ethnicy,
      registered: true,
    })

    return assistedInFila
  }*/
}