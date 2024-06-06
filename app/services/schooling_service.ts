import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import Schooling from '#models/schooling'
import { PageResult } from '../utils/pageable.js'

export default class SchoolingsService {
  async getSchoolings() {
    return await Schooling.query().orderBy('createdAt', 'asc')
  }

  async getAssistedsBySchooling(schoolingId: string, page: number, limit: number) {
    const schooling = await Schooling.query().where('id', schoolingId).first()

    if (!schooling)
      throw new EntityNotFoundException(
        'Schooling',
        'A escolaridade de id ' + schoolingId + ' não foi encontrado!'
      )

    const assistedPagination = await schooling.related('assisteds').query().paginate(page, limit)
    const assisteds = assistedPagination.all()

    return PageResult.toResult(assisteds, {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: assistedPagination.total,
      totalPages: assistedPagination.lastPage,
    })
  }
}
