import vine from '@vinejs/vine'

export const updateVolunteerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).alphaNumeric({ allowSpaces: true }),
    password: vine
      .string()
      .trim()
      .minLength(6)
      .confirmed({ confirmationField: 'password_confirmation' }),
    levelId: vine.number(),
  })
)

export const createVolunteerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).alphaNumeric({ allowSpaces: true }),
    email: vine.string().trim().email().toLowerCase(),
    password: vine
      .string()
      .trim()
      .minLength(6)
      .confirmed({ confirmationField: 'password_confirmation' }),
    levelId: vine.number(),
  })
)
