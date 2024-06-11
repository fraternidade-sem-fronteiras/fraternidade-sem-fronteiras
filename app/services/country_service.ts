import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import Country from '#models/country'
import { PageResult } from '../utils/pageable.js'

export default class CountriesService {
  async getCountries() {
    return await Country.query().orderBy('name', 'asc')
  }

  async getAssistedsByCountry(countryId: string, page: number, limit: number) {
    const country = await Country.query().where('id', countryId).first()

    if (!country)
      throw new EntityNotFoundException(
        'Country',
        'O país de id ' + countryId + ' não foi encontrado!'
      )

    const assistedPagination = await country.related('assisteds').query().paginate(page, limit)
    const assisteds = assistedPagination.all()

    return PageResult.toResult(assisteds, {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: assistedPagination.total,
      totalPages: assistedPagination.lastPage,
    })
  }
}
