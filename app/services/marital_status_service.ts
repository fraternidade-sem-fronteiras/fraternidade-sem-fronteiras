/**
 * Service para MaritalStatus
 * Apenas administradores podem modificar essas informações
 *
 * Talvez seja necessário que não permitir exclusão de um MaritalStatus, pois o idMaritalStatus é usado em Assisted
 */

import ConflictException from '#exceptions/conflict_exception'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import MaritalStatus from '#models/marital_status'

export default class MaritalStatusService {
  /**
   * Cria um novo MaritalStatus no banco de dados, ou retorna o MaritalStatus já existente
   * @param name
   * @returns MaritalStatus
   */
  async createMaritalStatus(name: string): Promise<MaritalStatus> {
    let maritalStatus = await MaritalStatus.findBy('name', name)

    if (maritalStatus) {
      throw new ConflictException('O estado civil já existe')
    }

    maritalStatus = new MaritalStatus()
    maritalStatus.name = name
    await maritalStatus.save()

    return maritalStatus
  }

  /**
   * Retorna o MaritalStatus buscado pelo id
   *
   * @param id
   * @returns MaritalStatus | null
   */
  async getMaritalStatusById(id: string): Promise<MaritalStatus | null> {
    const maritalStatus = await MaritalStatus.findBy('id', id)

    return maritalStatus
  }

  /**
   * Retorna todos os MaritalStatuses existentes
   *
   * @returns MaritalStatus[]
   */
  async getMaritalStatuses(): Promise<MaritalStatus[]> {
    const maritalStatuses = await MaritalStatus.all()
    return maritalStatuses
  }

  /**
   * Atualiza o nome do MaritalStatus
   *
   * @param id
   * @param name
   * @returns
   */
  async updateMaritalStatus(id: string, name: string): Promise<any> {
    let maritalStatus = await MaritalStatus.findByOrFail('id', id)

    let oldValueName = maritalStatus.name
    maritalStatus.name = name
    await maritalStatus.save()

    return {
      id: maritalStatus.id,
      updated: [
        {
          fieldName: 'name',
          oldValue: oldValueName,
          newValue: maritalStatus.name,
        },
      ],
    }
  }

  /**
   * Deleta o MaritalStatus do banco
   * @param id
   */
  async deleteMaritalStatus(id: string) {
    const maritalStatus = await MaritalStatus.findBy('id', id)

    if (!maritalStatus) {
      throw new EntityNotFoundException(
        'MaritalStatus',
        'O Estado Civil com id ' + id + ' não foi encontrado!'
      )
    }

    await maritalStatus.delete()
  }
}
