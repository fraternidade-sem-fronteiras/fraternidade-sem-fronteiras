import InvalidTokenException from '#exceptions/invalid_token_exception'
import TokenNotProvidedException from '#exceptions/token_not_provided_exception'
import TokenService from '#services/token_service'
import Session from '#validators/session'
import Volunteer from '#models/volunteer'
import VolunteerService from '#services/volunteer_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { inject } from '@adonisjs/core'
import UnregisteredVolunteerException from '#exceptions/unregistered_volunteer_exception'

@inject()
export default class AuthenticationMiddleware {
  constructor(
    readonly tokenService: TokenService,
    readonly volunteerService: VolunteerService
  ) {}
  async handle({ request }: HttpContext, next: NextFn) {
    const { authorization } = request.headers()

    if (!authorization) throw new TokenNotProvidedException()

    const currentToken = typeof authorization === 'string' ? authorization : authorization[0]

    if (!currentToken.includes('Bearer')) throw new TokenNotProvidedException()

    const token = currentToken.split(' ')[1]

    try {
      const payload: Session = await this.tokenService.verify(token)

      const volunteer: Volunteer | null = await this.volunteerService.getVolunteerById(payload.id)

      if (!volunteer) throw new InvalidTokenException()

      if (!volunteer.registered) throw new UnregisteredVolunteerException()

      request.all().user = volunteer

      return await next()
    } catch (err) {
      throw new InvalidTokenException()
    }
  }
}
