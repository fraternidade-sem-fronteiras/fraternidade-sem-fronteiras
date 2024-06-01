import vine from '@vinejs/vine'

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(128),
    permissions: vine.array(vine.string()),
  })
)
