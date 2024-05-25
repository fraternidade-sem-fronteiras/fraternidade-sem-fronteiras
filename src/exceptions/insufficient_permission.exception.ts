import CustomException from './custom.exception.js'

export default class InsufficientPermissionException extends CustomException {
  permissions: string[]

  constructor(permissions: string[]) {
    super('Insufficient permission')
    this.permissions = permissions
  }
}
