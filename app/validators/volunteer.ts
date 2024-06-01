import vine from '@vinejs/vine'

export const loginVolunteerValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().toLowerCase(),
    password: vine.string(),
  })
)

export const updateVolunteerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).alphaNumeric({ allowSpaces: true }),
    password: vine
      .string()
      .trim()
      .minLength(6)
      .confirmed({ confirmationField: 'password_confirmation' }),
    roles: vine.array(
      vine.string().trim().escape().minLength(3).maxLength(32).alphaNumeric({ allowSpaces: true })
    ),
  })
)

export const createVolunteerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).alphaNumeric({ allowSpaces: true }),
    email: vine.string().trim().email().toLowerCase(),
    roles: vine.array(vine.string().trim().escape().minLength(3).maxLength(32)),
  })
)
