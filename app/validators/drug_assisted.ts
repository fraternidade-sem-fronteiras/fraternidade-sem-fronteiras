import vine from '@vinejs/vine'

export const createDrugAssistedValidator = vine.compile(
  vine.object({
    assistedId: vine.number(),
    drugId: vine.number(),
    startTime: vine.date().optional(),
    frequency: vine.number(),
  })
)
