import CustomErrorException from './custom_error_exception.js'

export default class ConflictException extends CustomErrorException {
  static readonly status = 409

  constructor(message?: string) {
    super(message ?? 'Conflict')
  }
}
