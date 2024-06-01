import vine from '@vinejs/vine'

export const paginationValidator = vine.compile(
  vine.object({
    page: vine.number().min(1),
    limit: vine.number().max(100),
  })
)

export const filtersValidator = vine.compile(
  vine.object({
    filter: vine.string(),
    value: vine.string(),
  })
)

export const sortValidator = vine.compile(
  vine.object({
    orderBy: vine.string(),
    order: vine.enum(['asc', 'desc']),
  })
)
