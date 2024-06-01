import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import Assisted from '#models/assisted'
import Child from '#models/child'

export default class ChildService {
  /**
   * Registra um novo filho a um assistido
   *
   * @param assistedId
   * @param name
   * @param birthDate
   * @param livingWith
   * @returns
   */

  async createChild(
    assistedId: string,
    name: string,
    birthDate: Date,
    livingWith: string
  ): Promise<Child> {
    const assisted = await Assisted.query().where('id', assistedId).first()

    if (!assisted) {
      throw new EntityNotFoundException(
        'Assisted',
        'O assistido de id ' + assistedId + ' não foi encontrado!'
      )
    }

    const child = await Child.create({
      assistedId,
      name,
      birthDate,
      livingWith,
    })

    return child
  }

  /**
   * Retorna todos os filhos registrados de um assistido
   *
   * @param assistedId
   * @returns
   */

  async getChildsById(assistedId: string): Promise<Child[]> {
    return await Child.query().where('assisted_id', assistedId)
  }

  async getChildByName(assistedId: string, name: string) {
    return await Child.query().where('assisted_id', assistedId).where('name', name).firstOrFail()
  }

  /**
   * Deleta o filho de um assistido pelo nome
   * @param id
   * @param name
   */

  async deleteChildByName(id: number, name: string) {
    const child = await Child.query().where('assisted_id', id).where('name', name).firstOrFail()

    if (child.name != name) {
      throw new Error('O nome do filho não confere com o nome informado')
    }

    await child.delete()
  }
}
