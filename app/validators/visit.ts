import vine from '@vinejs/vine'

export const createVisitValidator = vine.compile(
  vine.object({
    assistedId: vine.string(),
    dateVisit: vine
      .date({ formats: ['yyyy-MM-dd HH:mm:ss'] })
      .nullable()
      .optional(),
    attended: vine.boolean().nullable().optional(),
    description: vine.string().trim().minLength(3).maxLength(200).nullable().optional(),
  })
)

export const visitValidator = vine.compile(
  vine.object({
    dateVisit: vine
      .date({ formats: ['yyyy-MM-dd HH:mm:ss'] })
      .nullable()
      .optional(),
    attended: vine.boolean().nullable().optional(),
    description: vine.string().trim().minLength(3).maxLength(200).nullable().optional(),
  })
)
