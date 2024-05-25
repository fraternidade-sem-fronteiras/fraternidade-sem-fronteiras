import CustomException from './custom.exception.js'

export default class UnregisteredException extends CustomException {
  constructor() {
    super('Unregistered')
  }
}
