import CustomErrorException from './custom_error_exception.js'

export default class EntityNotFoundException extends CustomErrorException {
  static readonly status = 404

  constructor(entityName: string, message: string = 'Entity not found') {
    super(message + ' (' + entityName + ')')
  }
}
