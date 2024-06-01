/**
 * Service para Gênero
 * Apenas administradores podem modificar essas informações
 *
 * Talvez seja necessário que não permitir exclusão de um Gender, pois o idGender é usado em Assisted
 */

import ConflictException from '#exceptions/conflict_exception'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import Gender from '#models/gender'
import { PageResult } from '../utils/pageable.js'

export default class GenderService {
  /**
   * Cria um novo Gender no banco de dados, ou retorna o Gender já existente
   * @param name
   * @returns Gender
   */
  async createGender(name: string): Promise<Gender> {
    const gender = await Gender.findBy('name', name)

    if (gender) throw new ConflictException('O gênero ' + name + ' já existe')

    return await Gender.create({ name })
  }

  async getAssistedsByGender(genderId: string, page: number, limit: number) {
    const gender = await Gender.query().where('id', genderId).first()

    if (!gender)
      throw new EntityNotFoundException(
        'Gender',
        'O gênero de id ' + genderId + ' não foi encontrado!'
      )

    const assistedPagination = await gender.related('assisteds').query().paginate(page, limit)
    const assisteds = assistedPagination.all()

    return PageResult.toResult(assisteds, {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: assistedPagination.total,
      totalPages: assistedPagination.lastPage,
    })
  }

  /**
   * Retorna o Gender buscado pelo id
   *
   * @param id
   * @returns Gender | null
   */
  async getGenderById(id: string): Promise<Gender | null> {
    const gender = await Gender.findBy('id', id)

    return gender
  }

  /**
   * Retorna todos os Genders existentes
   *
   * @returns Gender[]
   */
  async getGenders(): Promise<Gender[]> {
    const genders = await Gender.query().orderBy('createdAt', 'asc')
    return genders
  }

  /**
   * Atualiza o nome do Gender
   *
   * @param id
   * @param name
   * @returns
   */
  async updateGender(id: string, name: string): Promise<any> {
    let gender = await Gender.findByOrFail('id', id)

    let oldValueName = gender.name
    gender.name = name
    await gender.save()

    return {
      id: gender.id,
      updated: [
        {
          fieldName: 'name',
          oldValue: oldValueName,
          newValue: gender.name,
        },
      ],
    }
  }

  /**
   * Deleta o Gender do banco
   * @param id
   */
  async deleteGender(id: string) {
    let gender = await Gender.findBy('id', id)

    if (!gender) {
      throw new EntityNotFoundException('Gender', 'O gênero de id ' + id + ' não foi encontrado!')
    }

    await gender.delete()
  }
}
