import DrugAssisted from '#models/drug_assisted'
import { DateTime } from 'luxon'

export default class DrugAssistedService {
  async createDrugAssisted(
    assistedId: number,
    drugId: number,
    startTime: Date | undefined | null,
    frequency: number
  ): Promise<DrugAssisted> {
    return DrugAssisted.create({
      assistedId: assistedId,
      drugId: drugId,
      startTime: startTime ? DateTime.fromJSDate(startTime) : null,
      frequency: frequency,
    })
  }

  async getDrugAssisteds(page: number, perPage: number): Promise<DrugAssisted[]> {
    return DrugAssisted.query()
      .paginate(page, perPage)
      .then((result) => result.all())
  }

  async getDrugAssistedById(id: number): Promise<DrugAssisted> {
    return DrugAssisted.findOrFail(id)
  }

  async deleteDrugAssistedById(id: number): Promise<void> {
    const drugAssisted = await DrugAssisted.findOrFail(id)
    await drugAssisted.delete()
  }
}
