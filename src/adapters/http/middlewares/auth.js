import jwt from 'jsonwebtoken'
import { fail } from '../../../utils/response.js'

export function jwtGuard(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return fail(res, 'Token ausente', 401)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: payload.sub }
    return next()
  } catch {
    return fail(res, 'Token inválido ou expirado', 401)
  }
}
