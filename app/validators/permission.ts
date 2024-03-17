import vine from '@vinejs/vine'

export const createPermissionValidator = vine.compile(
  vine.object({
    name: vine.string().toUpperCase(),
  })
)
