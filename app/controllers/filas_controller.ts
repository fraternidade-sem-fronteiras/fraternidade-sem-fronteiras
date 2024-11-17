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
@inject()
export default class FilasController {
  constructor(readonly filaService: FilaService) {}


    public async index({ request, response }: HttpContext) {
        const search = decodeURI(request.input('search', ''))
        const query = Fila.query()
        
        const pagination = await paginationValidator.validate({
          page: request.input('page', 1),
          limit: request.input('limit', 10),
        })
    
        const { page, limit } = pagination

        const qtd = await query.where('capacity','>',100).count('* as total')
        const count = qtd[0].$extras.total
        const assisteds_fila = await this.filaService.getPageFila(page, limit, search)
        console.log(count)
        return response.json(assisteds_fila)
      }
      

    public async show({ response, request }: HttpContext) {
        const search = request.param('id', '')

       
        const assisted_fila = await this.filaService.getAssistedFila(search)
    
    
        if (!assisted_fila)
          throw new EntityNotFoundException('O assistido "' + search + '" não foi encontrado!')
    
        return response.json(assisted_fila)
      }
    
    public async update({response, request, params}: HttpContext){
      //fechar a fila ativa
      const { id } = params
      //const payload = await createFilaValidator.validate(request.all())
      const benefit = await this.filaService.updateCloseFila(id)
   
      return response.json(benefit)
    }
    

    public async store({request, response}: HttpContext){
      console.log('entrei')
      const data = await createFilaValidator.validate(request.body())
      const fila = await this.filaService.createFila(data)
      if(fila.capacity == -1){
        return "Ainda existe uma fila ativa"
      }

      return {
        msg: 'inserção concluida',
        fila
      }
      
   
    }
    async destroy({ response, params }: HttpContext) {
      // desestrutura o id do Contact da requisição
      const { id } = params
  
      try {
        // deleta o Contact pelo Service
        await this.filaService.deleteFila(id)
  
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