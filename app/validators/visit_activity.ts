import vine from '@vinejs/vine'

export const visitActivityValidator = vine.compile(
  vine.object({
    visitId: vine.number(),
    activityId: vine.number(),
  })
)
