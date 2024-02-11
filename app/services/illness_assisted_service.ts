import IllnessAssisted from '#models/illness_assisted'

export default class IllnessAssistedService {
  async createIllnessAssisted(
    assistedId: number,
    illnessId: number,
    placeMedicalCare: string | null,
    remarks: string | null,
    alreadyTreated: string | null
  ): Promise<IllnessAssisted> {
    return await IllnessAssisted.create({
      assistedId,
      illnessId,
      placeMedicalCare,
      remarks,
      alreadyTreated,
    })
  }

  async getIllnessAssistedByAssisted(
    assistedId: number,
    page: number,
    perPage: number
  ): Promise<IllnessAssisted[]> {
    return (
      await IllnessAssisted.query().where('assisted_id', assistedId).paginate(page, perPage)
    ).all()
  }

  async getIllnessAssistedByIllness(
    illnessId: number,
    page: number,
    perPage: number
  ): Promise<IllnessAssisted[]> {
    return (
      await IllnessAssisted.query().where('illness_id', illnessId).paginate(page, perPage)
    ).all()
  }

  async getIllnessAssistedByAssistedAndIllness(
    assistedId: number,
    illnessId: number,
    page: number,
    perPage: number
  ): Promise<IllnessAssisted[]> {
    return (
      await IllnessAssisted.query()
        .where('assisted_id', assistedId)
        .andWhere('illness_id', illnessId)
        .paginate(page, perPage)
    ).all()
  }

  async getIllnessAssisted(page: number, perPage: number): Promise<IllnessAssisted[]> {
    return (await IllnessAssisted.query().paginate(page, perPage)).all()
  }

  async deleteIllnessAssisted(id: number) {
    const illnessAssisted = await IllnessAssisted.query().where('id', id).firstOrFail()

    await illnessAssisted.delete()
  }
}
