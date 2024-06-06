import CustomErrorException from '#exceptions/custom_error_exception'

export default class ForbiddenException extends CustomErrorException {
  static readonly status = 403

  constructor(message: string = 'You do not have permission to access this resource!') {
    super(message)
  }
}
