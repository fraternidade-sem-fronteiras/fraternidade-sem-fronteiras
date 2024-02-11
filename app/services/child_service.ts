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
    assistedId: number,
    name: string,
    birthDate: Date,
    livingWith: string
  ): Promise<Child> {
    const child = new Child()

    child.assistedId = assistedId
    child.name = name
    child.birthDate = birthDate
    child.livingWith = livingWith

    await child.save()

    return child
  }

  /**
   * Retorna todos os filhos registrados de um assistido
   *
   * @param assistedId
   * @returns
   */

  async getChildsById(assistedId: number): Promise<Child[]> {
    return await Child.query().where('assisted_id', assistedId)
  }

  async getChildByName(assistedId: number, name: string) {
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
