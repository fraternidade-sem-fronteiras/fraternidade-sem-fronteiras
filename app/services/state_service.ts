import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import State from '#models/state'
import { PageResult } from '../utils/pageable.js'

export default class StatesService {
  async getStates() {
    return await State.query().orderBy('name', 'asc')
  }

  async getAssistedsByState(stateId: string, page: number, limit: number) {
    const state = await State.query().where('id', stateId).first()

    if (!state)
      throw new EntityNotFoundException(
        'State',
        'O estado de id ' + stateId + ' não foi encontrado!'
      )

    const assistedPagination = await state.related('assisteds').query().paginate(page, limit)
    const assisteds = assistedPagination.all()

    return PageResult.toResult(assisteds, {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: assistedPagination.total,
      totalPages: assistedPagination.lastPage,
    })
  }
}
