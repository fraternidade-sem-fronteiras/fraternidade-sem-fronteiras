import Visit from '#models/visit'
import { DateTime } from 'luxon'

export default class VisitService {
  /**
   * Cria visita
   * @param dateVisit
   * @param assistedId
   * @param attended
   * @param description
   * @returns
   */
  async createVisit(
    dateVisit: Date | null | undefined,
    assistedId: number,
    attended: boolean | null | undefined,
    description: string | null | undefined
  ): Promise<Visit> {
    let obj = new Visit()
    obj.dateVisit = dateVisit ? DateTime.fromJSDate(dateVisit) : DateTime.now().toUTC()
    obj.assistedId = assistedId
    obj.attended = !!attended
    obj.description = description ?? null
    await obj.save()

    return obj
  }

  /**
   * Retorna o Visit buscado pelo id
   *
   * @param id
   * @returns Visit | null
   */
  async getVisitById(id: number): Promise<Visit | null> {
    const obj = await Visit.findBy('id', id)

    return obj
  }

  /**
   * Retorna todos os Visits existentes
   *
   * @returns Visit[]
   */
  async getVisits(): Promise<Visit[]> {
    const objs = await Visit.all()
    return objs
  }

  /**
   * Atualiza o nome do Visit
   *
   * @param id
   * @param name
   * @returns
   */
  async updateVisit(
    id: number,
    dateVisit: Date | null | undefined,
    attended: boolean | null | undefined,
    description: string | null | undefined
  ): Promise<any> {
    let obj = await Visit.findByOrFail('id', id)

    let oldValueDateVisit = obj.dateVisit
    obj.dateVisit = dateVisit ? DateTime.fromJSDate(dateVisit) : obj.dateVisit

    let oldValueAttended = obj.attended
    obj.attended = attended ?? obj.attended

    let oldValueDescription = obj.description
    obj.description = description ?? obj.description

    await obj.save()

    return {
      id: obj.id,
      updated: [
        {
          fieldName: 'dateVisit',
          oldValue: oldValueDateVisit,
          newValue: obj.dateVisit,
        },
        {
          fieldName: 'attended',
          oldValue: oldValueAttended,
          newValue: obj.attended,
        },
        {
          fieldName: 'description',
          oldValue: oldValueDescription,
          newValue: obj.description,
        },
      ],
    }
  }

  /**
   * Deleta o Visit do banco
   * @param id
   */
  async deleteVisit(id: number) {
    let obj = await Visit.findBy('id', id)

    if (!obj) {
      throw new Error('Visita não encontrada')
    }

    await obj.delete()
  }
}
