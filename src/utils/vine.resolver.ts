import vine, { SimpleMessagesProvider, VineObject, errors as vineErrors } from '@vinejs/vine'

export default function vineResolver<T>(
  validator: VineObject<any, any, any>,
  messagesProvider?: { [key: string]: string }
): (data: T) => Promise<{ values: T; errors: { [key: string]: { message: string } } }> {
  return async function (data: T) {
    try {
      const vineResult = await vine.validate({
        schema: validator,
        data,
        messagesProvider: messagesProvider
          ? new SimpleMessagesProvider(messagesProvider)
          : undefined,
      })

      return {
        values: vineResult,
        errors: {},
      }
    } catch (ex) {
      const errors: { [key: string]: { message: string } } = {}

      if (ex instanceof vineErrors.E_VALIDATION_ERROR) {
        for (const error of ex.messages) {
          const { field, message } = error
          const array = errors[field]?.message
          errors[field] = { message: array ? `${array}, ${message}` : message }
          console.log(error)
        }
      }

      return {
        values: data,
        errors: errors,
      }
    }
  }
}
