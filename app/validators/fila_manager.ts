import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

export const createFilaManagerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().minLength(3).maxLength(256),
    filaId: vine.number(),
    assistedId: vine.number().optional(),
    socialName: vine.string().trim().escape().minLength(2).maxLength(64).optional(),
    registered: vine.boolean().optional(),
    served: vine.boolean(),
    
  })
)

export type CreateFilaManager = Infer<typeof createFilaManagerValidator>
