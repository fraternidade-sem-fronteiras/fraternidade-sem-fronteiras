import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import Assisted from '#models/assisted'
import DrugAssisted from '#models/drug_assisted'
import { DateTime } from 'luxon'

export default class DrugAssistedService {
  async createDrugAssisted(
    assistedId: string,
    drugId: string,
    startTime: Date | undefined | null,
    frequency: number
  ): Promise<DrugAssisted> {
    const assisted = await Assisted.query().where('id', assistedId).first()

    if (!assisted) {
      throw new EntityNotFoundException('O assistido de id ' + assistedId + ' não foi encontrado!')
    }

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
