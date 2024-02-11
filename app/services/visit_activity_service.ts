import VisitActivity from '#models/visit_activity'

export default class VisitActivityService {
  /**
   * Cria VisitActivity
   * @param visitId
   * @param activityId
   * @returns
   */
  async createVisitActivity(visitId: number, activityId: number): Promise<VisitActivity> {
    let obj = new VisitActivity()
    obj.visitId = visitId
    obj.activityId = activityId
    await obj.save()

    return obj
  }

  /**
   * Retorna VisitActivities buscado pelo VisitId
   *
   * @param visitId
   * @returns VisitActivity | null
   */
  async getVisitActivitiesByVisitId(visitId: number): Promise<VisitActivity[] | null> {
    const obj = await VisitActivity.query().where('visit_id', visitId)
    return obj
  }

  /**
   * Retorna VisitActivities buscado pelo activityId
   * @param activityId
   * @returns
   */
  async getVisitActivitiesByActivityId(activityId: number): Promise<VisitActivity[] | null> {
    const obj = await VisitActivity.query().where('activity_id', activityId)
    return obj
  }

  /**
   * Retorna todos os VisitActivitys existentes
   *
   * @returns VisitActivity[]
   */
  async getVisitActivities(): Promise<VisitActivity[]> {
    const objs = await VisitActivity.all()
    return objs
  }

  /**
   * Deleta VisitActivity do banco
   * @param visitId
   * @param activityId
   */
  async deleteVisitActivity(visitId: number, activityId: number) {
    let obj = await VisitActivity.query()
      .where('visit_id', visitId)
      .where('activity_id', activityId)
      .first()

    if (!obj) {
      throw new Error('VisitActivity não encontrada')
    }

    await obj.delete()
  }
}
