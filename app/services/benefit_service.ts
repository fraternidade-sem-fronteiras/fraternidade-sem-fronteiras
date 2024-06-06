/**
 * Service para Benefit
 * Apenas administradores podem modificar essas informações
 */

import Benefit from '#models/benefit'

export default class BenefitService {
  /**
   * Cria um novo Benefit no banco de dados, ou retorna o Benefit já existente
   * @param name
   * @returns Benefit
   */
  async createBenefit(name: string): Promise<Benefit> {
    let benefit = await Benefit.findBy('name', name)

    if (benefit) {
      return benefit
    }

    benefit = await Benefit.create({ name })

    return benefit
  }

  /**
   * Retorna o Benefit buscado pelo id
   *
   * @param id
   * @returns Benefit | null
   */
  async getBenefitById(id: number): Promise<Benefit | null> {
    const benefit = await Benefit.findBy('id', id)

    return benefit
  }
  /**
   * Retorna todos os Benefit existentes
   *
   * @returns Benefit[]
   */
  async getBenefit(): Promise<Benefit[]> {
    const benefits = await Benefit.all()
    return benefits
  }

  /**
   * Atualiza o nome do Benefit
   *
   * @param id
   * @param name
   * @returns
   */
  async updateBenefit(id: number, name: string): Promise<any> {
    let benefit = await Benefit.findByOrFail('id', id)

    let oldValueName = benefit.name
    benefit.name = name
    await benefit.save()

    return {
      id: benefit.id,
      updated: [
        {
          fieldName: 'name',
          oldValue: oldValueName,
          newValue: benefit.name,
        },
      ],
    }
  }
  /**
   * Deleta o Benefit do banco
   * @param id
   */
  async deleteBenefit(id: number) {
    let benefit = await Benefit.findBy('id', id)

    if (!benefit) {
      throw new Error('Benefício não encontrado')
    }

    await benefit.delete()
  }
}
