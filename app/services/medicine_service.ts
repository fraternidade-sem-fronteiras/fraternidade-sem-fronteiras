import Medicine from '#models/medicine'

export default class MedicineService {
  /**
   * Cria uma nova medicação
   * @param name O nome da nova medicação
   * @returns A medicação criada
   */

  async createMedicine(name: string): Promise<Medicine> {
    const medicine = await Medicine.query().where('name', name).first()

    if (medicine) {
      throw new Error('Medicine already exists')
    }

    return Medicine.create({
      name: name,
    })
  }

  /**
   * Busca diversas medicações pelo nome
   *
   * @param page Página atual
   * @param perPage Quantidade de medicações por página
   * @param name Nome da medicação a ser buscada
   * @returns
   */

  async getMedicines(page: number, perPage: number, name: string | null): Promise<Medicine[]> {
    if (name) {
      return (
        await Medicine.query().whereRaw(`name REGEXP '^[${name}]'`).paginate(page, perPage)
      ).all()
    }

    return (await Medicine.query().paginate(page, perPage)).all()
  }

  /**
   * Recupera uma medicação pelo nome
   *
   * @param name Nome da medicação a ser buscada
   * @returns
   */

  async getMedicineByName(name: string): Promise<Medicine> {
    return await Medicine.query().whereRaw(`name REGEXP '^[${name}]'`).firstOrFail()
  }

  /**
   * Deleta uma medicação
   *
   * @param id O id da medicação a ser deletada
   */

  async deleteMedicine(id: number) {
    const medicine = await Medicine.query().where('id', id).firstOrFail()

    await medicine.delete()
  }
}
