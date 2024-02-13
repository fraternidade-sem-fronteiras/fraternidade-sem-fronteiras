import vine, { VineObject, errors as vineErrors } from '@vinejs/vine'

export default function VineResolver<T>(
  validator: VineObject<any, any, any>
): (data: T) => Promise<{ values: T; errors: { [key: string]: string[] } }> {
  return async function (data: T) {
    try {
      const vineResult = await vine.validate({
        schema: validator,
        data,
      })

      return {
        values: vineResult,
        errors: {},
      }
    } catch (ex) {
      const errors: { [key: string]: string[] } = {}

      if (ex instanceof vineErrors.E_VALIDATION_ERROR) {
        for (const error of ex.messages) {
          const { field, message } = error
          const array = errors[field] ?? []
          errors[field] = [...array, message]
        }
      }

      console.log('errors no formulário: ', errors)

      return {
        values: data,
        errors: errors,
      }
    }
  }
}
