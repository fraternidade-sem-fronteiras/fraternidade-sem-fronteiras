import vine from '@vinejs/vine'

export const createChildValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().minLength(3).maxLength(100).alphaNumeric(),
    birthDate: vine.date(),
    livingWith: vine.string().trim().escape().minLength(3).maxLength(100).alphaNumeric(),
    assistedId: vine.number(),
  })
)
