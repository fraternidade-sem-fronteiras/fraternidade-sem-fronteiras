import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createActivityValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().minLength(3).maxLength(100).alphaNumeric(),
  })
)

export type CreateActivityDto = Infer<typeof createActivityValidator>