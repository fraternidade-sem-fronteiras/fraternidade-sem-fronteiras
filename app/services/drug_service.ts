import Drug from '#models/drug'

export default class DrugService {
  /**
   * Para registrar uma nova droga no banco de dados
   *
   * @param name Nome da nova droga
   * @returns
   */

  async createDrug(name: string): Promise<Drug> {
    const drug = await Drug.query().where('name', name).first()

    if (drug) {
      throw new Error('Drug already exists')
    }

    return Drug.create({
      name: name,
    })
  }

  /**
   * Busca diversas drogas pelo nome
   *
   * @param page Página atual
   * @param perPage Quantidade de drogas por página
   * @param name Nome da droga a ser buscada
   * @returns
   */

  async getDrugs(page: number, perPage: number, name: string | null): Promise<Drug[]> {
    if (name) {
      return (await Drug.query().whereRaw(`name REGEXP '^[${name}]'`).paginate(page, perPage)).all()
    }

    return (await Drug.query().paginate(page, perPage)).all()
  }

  /**
   * Para buscar uma droga pelo nome
   *
   * @param name Nome da droga a ser buscada
   * @returns A droga encontrada
   */

  async getDrugByName(name: string): Promise<Drug> {
    return await Drug.query().whereRaw(`name REGEXP '^[${name}]'`).firstOrFail()
  }

  /**
   * Deleta uma droga
   *
   * @param id O id da droga a ser deletada
   */

  async deleteDrug(id: number) {
    const drug = await Drug.query().where('id', id).firstOrFail()

    await drug.delete()
  }
}
