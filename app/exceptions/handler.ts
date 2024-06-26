import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import CustomErrorException from './custom_error_exception.js'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    if (error instanceof CustomErrorException) {
      return ctx.response.status(error.status).send({
        messages: [error.message],
        error: error.name,
        path: ctx.request.url(),
      })
    }

    const status = error?.status || 500
    const message = error?.messages
      ? error?.messages
      : [error?.message] || ['Internal server error']
    const code = error?.code || 'E_RUNTIME_EXCEPTION'

    return ctx.response.status(status).send({
      messages: message,
      error: code,
      path: ctx.request.url(),
    })
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: any, ctx: HttpContext) {
    if (error instanceof CustomErrorException) {
      return
    }
    return super.report(error, ctx)
  }
}
