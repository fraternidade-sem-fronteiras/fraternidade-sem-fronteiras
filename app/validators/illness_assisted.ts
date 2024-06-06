import vine from '@vinejs/vine'

export const createIllnessAssistedValidator = vine.compile(
  vine.object({
    assistedId: vine.string(),
    illnessId: vine.number(),
    placeMedicalCare: vine.string().nullable(),
    remarks: vine.string().nullable(),
    alreadyTreated: vine.string().nullable(),
  })
)
