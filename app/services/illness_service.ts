import Illness from '#models/illness'

export default class IllnessService {
  /**
   * Cria uma nova doença
   * @param name O nome da nova doença
   * @returns A doença criada
   */

  async createIllness(name: string): Promise<Illness> {
    const illness = await Illness.query().where('name', name).first()

    if (illness) {
      throw new Error('Illness already exists')
    }

    return Illness.create({
      name: name,
    })
  }

  /**
   * Busca diversas doença pelo nome
   *
   * @param page Página atual
   * @param perPage Quantidade de doenças por página
   * @param name Nome da doença a ser buscada
   * @returns
   */

  async getIllnesses(page: number, perPage: number, name: string | null): Promise<Illness[]> {
    let illnesses

    if (name) {
      illnesses = (
        await Illness.query().whereRaw(`name REGEXP '^[${name}]'`).paginate(page, perPage)
      ).all()
    } else {
      illnesses = (await Illness.query().paginate(page, perPage)).all()
    }

    return illnesses
  }

  /**
   * Recupera uma doença pelo nome
   *
   * @param name Nome da doença a ser buscada
   * @returns
   */

  async getIllnessByName(name: string): Promise<Illness> {
    return await Illness.query().whereRaw(`name REGEXP '^[${name}]'`).firstOrFail()
  }

  /**
   * Deleta uma doença
   *
   * @param id O id da doença a ser deletada
   */

  async deleteIllness(id: number) {
    const illness = await Illness.query().where('id', id).firstOrFail()

    await illness.delete()
  }
}
