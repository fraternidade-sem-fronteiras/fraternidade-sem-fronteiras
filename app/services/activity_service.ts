/**
 * Service para Atividade
 * Apenas administradores podem modificar essas informações
 *
 * Talvez seja necessário que não permitir exclusão de um Activity, pois ele é utilizado em outras
 * coisas. Caso se exclua uma Activity de uma Visit, por exemplo, a informação da atividade será perdida.
 */

import Activity from '#models/activity'

export default class ActivityService {
  /**
   * Cria um novo Activity no banco de dados, ou retorna o Activity já existente
   * @param name
   * @returns Activity
   */
  async createActivity(name: string): Promise<Activity> {
    let obj = await Activity.findBy('name', name)

    if (obj) {
      return obj
    }

    obj = new Activity()
    obj.name = name
    await obj.save()

    return obj
  }

  /**
   * Retorna o Activity buscado pelo id
   *
   * @param id
   * @returns Activity | null
   */
  async getActivityById(id: number): Promise<Activity | null> {
    const obj = await Activity.findBy('id', id)

    return obj
  }

  /**
   * Retorna todos os Activitys existentes
   *
   * @returns Activity[]
   */
  async getActivities(): Promise<Activity[]> {
    const objs = await Activity.all()
    return objs
  }

  /**
   * Atualiza o nome do Activity
   *
   * @param id
   * @param name
   * @returns
   */
  async updateActivity(id: number, name: string): Promise<any> {
    let obj = await Activity.findByOrFail('id', id)

    let oldValueName = obj.name
    obj.name = name
    await obj.save()

    return {
      id: obj.id,
      updated: [
        {
          fieldName: 'name',
          oldValue: oldValueName,
          newValue: obj.name,
        },
      ],
    }
  }

  /**
   * Deleta o Activity do banco
   * Talvez seja necessário que não permitir exclusão de um Activity, pois ele é utilizado em outras
   * coisas. Caso se exclua uma Activity de uma Visit, por exemplo, a informação da atividade será perdida.
   * @param id
   */
  async deleteActivity(id: number) {
    let obj = await Activity.findBy('id', id)

    if (!obj) {
      throw new Error('Atividade não encontrada')
    }

    await obj.delete()
  }
}
