import vine from '@vinejs/vine'

export const createDrugAssistedValidator = vine.compile(
  vine.object({
    assistedId: vine.string(),
    drugId: vine.string(),
    startTime: vine.date().optional(),
    frequency: vine.number(),
  })
)
