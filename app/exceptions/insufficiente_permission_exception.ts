import CustomErrorException from './custom_error_exception.js'

export default class InsufficientePermissionException extends CustomErrorException {
  static readonly status = 403

  constructor(message?: string) {
    super(message ?? 'Insufficiente Permission')
  }
}
