import CustomErrorException from './custom_error_exception.js'

export default class TokenNotProvidedException extends CustomErrorException {
  static readonly status = 400

  constructor() {
    super('Token not provided')
  }
}
