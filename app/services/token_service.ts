import TokenExpiredException from '#exceptions/token_expired_exception'
import Volunteer from '#models/volunteer'
import env from '#start/env'
import Session from '#validators/session'
import jwt from 'jsonwebtoken'

export default class TokenService {
  async generate(volunteer: Volunteer): Promise<string> {
    const payload: Session = {
      id: volunteer.id,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    }

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        env.get('TOKEN_SECRET'),
        { expiresIn: 1000 * 60 * 60 * 24 * 7 },
        (err, token) => {
          if (err || !token) return reject(err)
          return resolve(token)
        }
      )
    })
  }

  async verify(token: string): Promise<Session> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, env.get('TOKEN_SECRET'), (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') return reject(err)

        if (decoded.expiresAt < Date.now()) return reject(new TokenExpiredException())

        return resolve(decoded as Session)
      })
    })
  }
}
