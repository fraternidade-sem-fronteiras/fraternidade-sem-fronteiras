import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

export const createFilaValidator = vine.compile(
  vine.object({
    capacity: vine.number(),
    active: vine.boolean(),
    
  })
)

export type CreateFila = Infer<typeof createFilaValidator>
