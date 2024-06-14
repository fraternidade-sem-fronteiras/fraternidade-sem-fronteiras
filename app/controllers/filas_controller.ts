import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import FilaService from '#services/fila_service'
import { createFilaValidator } from '#validators/fila'
import { paginationValidator } from '#validators/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class FilasController {
    public async store(){
        return {
            msg:'inserção concluida'
        }
    }
}