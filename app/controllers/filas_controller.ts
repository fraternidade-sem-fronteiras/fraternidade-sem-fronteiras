import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import ConflictException from '#exceptions/conflict_exception'
import { PageResult } from '../utils/pageable.js'
import FilaService from '#services/fila_service'
import { createFilaValidator } from '#validators/fila'
import { paginationValidator } from '#validators/filter'
import Fila from '#models/fila'

import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'


const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/

export default class FilasController {
  //constructor(readonly filaService: FilaService) {}


    public async index({ request, response }: HttpContext) {
        const search = decodeURI(request.input('search', ''))
        const query =  Fila.query()
        
        const pagination = await paginationValidator.validate({
          page: request.input('page', 1),
          limit: request.input('limit', 10),
        })
    
        const { page, limit } = pagination

        
        //const assisteds_fila = await this.filaService.getPageFila(page, limit, search)
        
      
        if (search) {
          console.log(search)
          if (uuidRegex.test(search)) {
            return await query.where('id', search).paginate(page, limit)
          }
    
         
        }
    
        const assistedsPagination = await query.paginate(page, limit)
        const assisteds = assistedsPagination.all()
          
        const assisteds_fila = PageResult.toResult(assisteds, {
          currentPage: page,
          itemsPerPage: limit,
          totalPages: assistedsPagination.lastPage,
          totalItems: assistedsPagination.total,
        })

        return response.json(assisteds_fila)
      }
      

    public async show({ response, request }: HttpContext) {
        const search = request.param('id', '')

        const assisted_fila = await Fila.query().where('id', search).firstOrFail()
  
        //const assisted_fila = await this.filaService.getAssistedFila(search)
    
    
        if (!assisted_fila)
          throw new EntityNotFoundException('O assistido "' + search + '" não foi encontrado!')
    
        return response.json(assisted_fila)
      }
    
    public async updateStatus({response, request, params}: HttpContext){
      //fechar a fila ativa
      const { id } = params
      const payload = await createFilaValidator.validate(request.all())
      //const benefit = await this.filaService.updateCloseFila(id, payload.active)
      
      let fila = await Fila.findByOrFail('id', id)
      fila.active = payload.active
      await fila.save()

     
        const benefit = {id: fila.id,
        updated: [
          {
            fieldStatusServed: 'fechado',
            newValue: fila.active,
          },
        ]
      }
      
      return response.json(benefit)
    }
    

    public async store({request, response}: HttpContext){
      console.log('entrei')
        const payload = await createFilaValidator.validate(request.body())
        //const fila = await this.filaService.createFila(data)
        const busca = await Fila.findBy('active', true)
      if(busca != null){
        throw new ConflictException('ainda existe uma fila aberta')
      }
      await Fila.create(payload)
      return {
        msg: 'inserção concluida',
      }
      
   
    }
    async destroy({ response, params }: HttpContext) {
      // desestrutura o id do Contact da requisição
      const { id } = params
  
      try {
        // deleta o Contact pelo Service
        //await this.filaService.deleteFila(id)
  
        let fila = await Fila.findBy('id', id)

        if (!fila) {
          throw new Error('fila não encontrada')
        }
        await fila.delete()
        
        // retorna status de sucesso: deletado
        return response.status(204)

      } catch (error) {
        // retorna erro, caso alguma instrução do try dê problema
        if (error instanceof Error) {
          return response.status(400).json({ message: error.message })
        }
  
        throw error
      }
    }
}