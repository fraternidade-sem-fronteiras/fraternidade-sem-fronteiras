import vine from '@vinejs/vine'

export const activityValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().minLength(3).maxLength(100).alphaNumeric(),
  })
)
