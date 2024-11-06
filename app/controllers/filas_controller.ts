import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import ConflictException from '#exceptions/conflict_exception'
import FilaService from '#services/fila_service'
import { createFilaValidator } from '#validators/fila'
import { paginationValidator } from '#validators/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
const Fila = ("app/models/fila");

export default class FilasController {
    constructor(readonly filaService: FilaService) {}

    public async index({ request, response }: HttpContext) {
        const search = decodeURI(request.input('search', ''))
    
        const pagination = await paginationValidator.validate({
          page: request.input('page', 1),
          limit: request.input('limit', 10),
        })
    
        const { page, limit } = pagination
    
        const assisteds_fila = await this.filaService.getPageFila(page, limit, search)
        return response.json(assisteds_fila)
      }
      

      public async show({ response, request }: HttpContext) {
        const search = request.param('id', '')
        const assisted_fila = await this.filaService.getAssistedFila(search)
    
    
        if (!assisted_fila)
          throw new EntityNotFoundException('O assistido "' + search + '" não foi encontrado!')
    
        return response.json(assisted_fila)
      }
    
    public async updateStatus({response, request, params}: HttpContext){
      const { id } = params
      const payload = await createFilaValidator.validate(request.all())
      const benefit = await this.filaService.updateCloseFila(id, payload.active)
      return response.json(benefit)
    }
    

    public async store({request, response}: HttpContext){
      console.log('entrei')
      const data = await request.all()
        /*const data = await createFilaValidator.validate(request.body())
        const fila = await this.filaService.createFila(data)
        if(fila.capacity == -1){
          throw new ConflictException('ainda existe uma fila aberta')
        }*/
        return {
            msg:'inserção concluida',

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