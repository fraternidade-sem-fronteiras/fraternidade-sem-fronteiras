import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import FilaService from '#services/fila_service'
import { createFilaValidator } from '#validators/fila'
import { paginationValidator } from '#validators/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
const Fila = ("app/models/fila");

export default class FilasController {
    constructor(readonly FilaService: FilaService) {}

    public async index({ request, response }: HttpContext) {
        const search = decodeURI(request.input('search', ''))
    
        const pagination = await paginationValidator.validate({
          page: request.input('page', 1),
          limit: request.input('limit', 10),
        })
    
        const { page, limit } = pagination
    
        const assisteds_fila = await this.FilaService.getAssistedsFila(page, limit, search)
        return response.json(assisteds_fila)
      }
      

      public async show({ response, request }: HttpContext) {
        const search = request.param('id', '')
        const assisted_fila = await this.FilaService.getAssistedFila(search)
    
    
        if (!assisted_fila)
          throw new EntityNotFoundException('O assistido "' + search + '" não foi encontrado!')
    
        return response.json(assisted_fila)
      }
    
    public async updateStatus({response, request, params}: HttpContext){
      const { id } = params
      const payload = await createFilaValidator.validate(request.all())
      const benefit = await this.FilaService.updateStatus(id, payload.served)
      return response.json(benefit)
    }
    

    public async store({request, response}: HttpContext){
        const data = await createFilaValidator.validate(request.body())
        const fila = await this.FilaService.createFila(data)
        return {
            msg:'inserção concluida',
            fila
        }
    }
}