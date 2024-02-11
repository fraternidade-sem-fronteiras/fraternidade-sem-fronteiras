import vine from '@vinejs/vine'

export const benefitValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .regex(/^[a-zA-ZÀ-ú0-9()\s]+$/),
  })
)
