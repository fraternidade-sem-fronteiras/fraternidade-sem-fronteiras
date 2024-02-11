import vine from '@vinejs/vine'

export const createContactValidator = vine.compile(
  vine.object({
    assistedId: vine.number(),
    name: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .alphaNumeric({ allowSpaces: true }),
    kinship: vine.string().trim().escape().minLength(3).maxLength(100),
    phone: vine.string().mobile().optional(),
    email: vine.string().trim().maxLength(100).email().optional(),
    other: vine.string().trim().maxLength(100).optional(),
  })
)

export const updateContactValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .alphaNumeric({ allowSpaces: true })
      .optional(),
    kinship: vine.string().trim().escape().minLength(3).maxLength(100).optional(),
    phone: vine.string().mobile().optional(),
    email: vine.string().trim().maxLength(100).email().optional(),
    other: vine.string().trim().maxLength(100).optional(),
  })
)
