import TokenExpiredException from '#exceptions/token/token_expired_exception'
import Volunteer from '#models/volunteer'
import env from '../../start/env.js'
import Session from '#validators/session'
import jwt from 'jsonwebtoken'
import Token from '#models/token'
import TokenNotFoundException from '#exceptions/token/token_not_provided_exception'
import { DateTime } from 'luxon'

export default class TokenService {
  getTokenExpiresTime() {
    return env.get('TOKEN_EXPIRES') * 1000
  }

  async generate(volunteer: Volunteer): Promise<string> {
    const payload: Session = {
      id: volunteer.id,
      expiresAt: Date.now() + this.getTokenExpiresTime(),
    }

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        env.get('TOKEN_SECRET'),
        { expiresIn: this.getTokenExpiresTime() },
        async (err, token) => {
          if (err || !token) return reject(err)

          await Token.create({
            token,
            volunteerId: volunteer.id,
            expiresAt: DateTime.fromMillis(payload.expiresAt),
          })

          return resolve(token)
        }
      )
    })
  }

  async verify(jwtToken: string): Promise<Session> {
    return new Promise((resolve, reject) => {
      jwt.verify(jwtToken, env.get('TOKEN_SECRET'), async (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') return reject(err)

        if (decoded.expiresAt < Date.now()) return reject(new TokenExpiredException())

        const token = await Token.findBy('token', jwtToken)

        if (!token) return reject(new TokenNotFoundException())

        if (token.expiresAt.toMillis() < Date.now()) {
          return reject(new TokenExpiredException())
        }

        return resolve(decoded as Session)
      })
    })
  }
}
