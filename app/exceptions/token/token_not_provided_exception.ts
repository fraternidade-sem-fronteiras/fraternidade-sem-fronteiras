import CustomErrorException from '../custom_error_exception.js'

export default class TokenNotFoundException extends CustomErrorException {
  static readonly status = 401

  constructor() {
    super('Token Not Found')
  }
}
