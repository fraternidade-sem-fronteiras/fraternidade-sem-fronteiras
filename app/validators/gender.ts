import vine from '@vinejs/vine'

export const createGenderValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(64),
  })
)
