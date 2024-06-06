export default interface Session {
  id: string
  expiresAt: number
  iat?: number
  exp?: number
}
