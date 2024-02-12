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

export const filtersVolunteerValidator = vine.compile(
  vine.object({
    page: vine.number(),
    limit: vine.number(),
    orderBy: vine.enum(['id', 'name', 'email', 'level_id']),
    order: vine.enum(['asc', 'desc']),
  })
)
