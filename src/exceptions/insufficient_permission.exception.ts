import CustomException from './custom.exception.js'

export default class InsufficientPermissionException extends CustomException {
  constructor() {
    super('Insufficient permission')
  }
}
