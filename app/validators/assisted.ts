import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

export const createAssistedValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().minLength(3).maxLength(256),
    socialName: vine.string().trim().escape().minLength(2).maxLength(64).optional(),
    dateBirth: vine
      .date()
      .optional()
      .transform((value) => DateTime.fromISO(value.toISOString())),
    ethnicy: vine.string().trim().escape().minLength(3).maxLength(100).alphaNumeric().optional(),
    genderId: vine.string().uuid().optional(),
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
    country: vine.string().trim().escape().minLength(2).maxLength(100).optional(),
    state: vine
      .string()
      .trim()
      .escape()
      .minLength(2)
      .maxLength(100)
      .optional()
      .requiredWhen('country', '=', 'Brasil'),
    servedNum: vine.number().optional(),
    city: vine
      .string()
      .trim()
      .escape()
      .minLength(2)
      .maxLength(100)
      .optional()
      .requiredWhen('country', '=', 'Brasil'),
    maritalStatusId: vine.number().optional(),
    schoolingId: vine.string().uuid().optional(),
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

export type CreateAssistedDto = Infer<typeof createAssistedValidator>
