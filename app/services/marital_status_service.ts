/**
 * Service para MaritalStatus
 * Apenas administradores podem modificar essas informações
 *
 * Talvez seja necessário que não permitir exclusão de um MaritalStatus, pois o idMaritalStatus é usado em Assisted
 */

import MaritalStatus from '#models/marital_status'

export default class MaritalStatusService {
  /**
   * Cria um novo MaritalStatus no banco de dados, ou retorna o MaritalStatus já existente
   * @param name
   * @returns MaritalStatus
   */
  async createMaritalStatus(name: string): Promise<MaritalStatus> {
    let marital_status = await MaritalStatus.findBy('name', name)

    if (marital_status) {
      return marital_status
    }

    marital_status = new MaritalStatus()
    marital_status.name = name
    await marital_status.save()

    return marital_status
  }

  /**
   * Retorna o MaritalStatus buscado pelo id
   *
   * @param id
   * @returns MaritalStatus | null
   */
  async getMaritalStatusById(id: number): Promise<MaritalStatus | null> {
    const marital_status = await MaritalStatus.findBy('id', id)

    return marital_status
  }

  /**
   * Retorna todos os MaritalStatuses existentes
   *
   * @returns MaritalStatus[]
   */
  async getMaritalStatuses(): Promise<MaritalStatus[]> {
    const marital_statuses = await MaritalStatus.all()
    return marital_statuses
  }

  /**
   * Atualiza o nome do MaritalStatus
   *
   * @param id
   * @param name
   * @returns
   */
  async updateMaritalStatus(id: number, name: string): Promise<any> {
    let marital_status = await MaritalStatus.findByOrFail('id', id)

    let oldValueName = marital_status.name
    marital_status.name = name
    await marital_status.save()

    return {
      id: marital_status.id,
      updated: [
        {
          fieldName: 'name',
          oldValue: oldValueName,
          newValue: marital_status.name,
        },
      ],
    }
  }

  /**
   * Deleta o MaritalStatus do banco
   * @param id
   */
  async deleteMaritalStatus(id: number) {
    let marital_status = await MaritalStatus.findBy('id', id)

    if (!marital_status) {
      throw new Error('Estado Civil não encontrado')
    }

    await marital_status.delete()
  }
}
