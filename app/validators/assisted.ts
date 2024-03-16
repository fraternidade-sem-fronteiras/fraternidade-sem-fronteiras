import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createAssistedValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .alphaNumeric({ allowSpaces: true }),
    socialName: vine
      .string()
      .trim()
      .escape()
      .minLength(2)
      .maxLength(32)
      .alphaNumeric({ allowSpaces: true })
      .optional(),
    dateBirth: vine
      .date()
      .optional()
      .transform((value) => DateTime.fromISO(value.toISOString())),
    ethnicy: vine.string().trim().escape().minLength(3).maxLength(100).alphaNumeric().optional(),
    genderId: vine.number().optional(),
    father: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .alphaNumeric({ allowSpaces: true })
      .optional(),
    mother: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .alphaNumeric({ allowSpaces: true })
      .optional(),
    country: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .alphaNumeric({ allowSpaces: true })
      .optional(),
    state: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .alphaNumeric({ allowSpaces: true })
      .optional(),
    city: vine
      .string()
      .trim()
      .escape()
      .minLength(3)
      .maxLength(100)
      .alphaNumeric({ allowSpaces: true })
      .optional(),
    maritalStatusId: vine.number().optional(),
    cpf: vine
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .optional(),
    rg: vine
      .string()
      .regex(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d|X|x$)/)
      .optional(),
  })
)
