// import type { HttpContext } from '@adonisjs/core/http'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import FilaManagerService from '#services/fila_manager_service'
import { createFilaManagerValidator } from '#validators/fila_manager'
import { paginationValidator } from '#validators/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
const Fila = ("app/models/fila");
@inject()
export default class FilaManagersController {
constructor(readonly FilaManagerService: FilaManagerService) {}

    public async index({ request, response }: HttpContext) {
      //mostra todos os rows, paginaados
        const search = decodeURI(request.input('search', ''))
        const flagFila = request.param('id_fila', '')
    
        const pagination = await paginationValidator.validate({
          page: request.input('page', 1),
          limit: request.input('limit', 10),
        })
    
        const { page, limit } = pagination
    
        const assisteds_fila = await this.FilaManagerService.getPagesAssistedsFila(page, limit, search, flagFila)
        return response.json(assisteds_fila)
      }
      

    public async show({ response, request }: HttpContext) {
      //mostra um row de um cliente numa fila
        const search = request.param('id', '')
        const flagFila = request.param('fila_id', '')
        const assisted_fila = await this.FilaManagerService.getAssistedFila(search, flagFila)
    
    
        if (!assisted_fila)
          throw new EntityNotFoundException('O assistido "' + search + '" não foi encontrado!')
    
        return response.json(assisted_fila)
      }
    
    public async updateAssistedInFila({response, request, params}: HttpContext){
      //verifica se a fila existe e se o atendido está nela, aponta que ele foi atendido

      const { id } = params
      const payload = await createFilaManagerValidator.validate(request.all())
      const benefit = await this.FilaManagerService.updateStatusAssisted(id, payload.filaId, payload.served)
      return response.json(benefit)
    }
    

    public async store({request, response}: HttpContext){
      //cria um row na tabela com o id da fila e do cliente
        const data = await createFilaManagerValidator.validate(request.body())
        console.log(data)
        const fila = await this.FilaManagerService.createAssistedInFila(data)
        return {
            msg:'inserção concluida',
           
        }
    }

}