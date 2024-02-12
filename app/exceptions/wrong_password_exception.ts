import CustomErrorException from '#exceptions/custom_error_exception'

export default class WrongPasswordException extends CustomErrorException {
  static readonly status = 401

  constructor() {
    super('Wrong credentials')
  }
}
