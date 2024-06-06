import CustomErrorException from '../custom_error_exception.js'

export default class InvalidTokenException extends CustomErrorException {
  static readonly status = 401

  constructor() {
    super('Invalid token')
  }
}
