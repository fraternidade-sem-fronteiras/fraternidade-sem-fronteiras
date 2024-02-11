/**
 * Service para Gênero
 * Apenas administradores podem modificar essas informações
 *
 * Talvez seja necessário que não permitir exclusão de um Gender, pois o idGender é usado em Assisted
 */

import Gender from '#models/gender'

export default class GenderService {
  /**
   * Cria um novo Gender no banco de dados, ou retorna o Gender já existente
   * @param name
   * @returns Gender
   */
  async createGender(name: string): Promise<Gender> {
    let gender = await Gender.findBy('name', name)

    if (gender) {
      return gender
    }

    gender = new Gender()
    gender.name = name
    await gender.save()

    return gender
  }

  /**
   * Retorna o Gender buscado pelo id
   *
   * @param id
   * @returns Gender | null
   */
  async getGenderById(id: number): Promise<Gender | null> {
    const gender = await Gender.findBy('id', id)

    return gender
  }

  /**
   * Retorna todos os Genders existentes
   *
   * @returns Gender[]
   */
  async getGenders(): Promise<Gender[]> {
    const genders = await Gender.all()
    return genders
  }

  /**
   * Atualiza o nome do Gender
   *
   * @param id
   * @param name
   * @returns
   */
  async updateGender(id: number, name: string): Promise<any> {
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
  async deleteGender(id: number) {
    let gender = await Gender.findBy('id', id)

    if (!gender) {
      throw new Error('Gênero não encontrado')
    }

    await gender.delete()
  }
}
