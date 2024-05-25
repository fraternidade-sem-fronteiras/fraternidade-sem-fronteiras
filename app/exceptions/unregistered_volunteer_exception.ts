import CustomErrorException from './custom_error_exception.js'

export default class UnregisteredVolunteerException extends CustomErrorException {
  static readonly status = 403

  constructor() {
    super(
      'Your request could not be processed due to a your unregistered status. Please, contact the system administrator.'
    )
  }
}
