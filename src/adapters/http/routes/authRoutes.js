import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'

const r = Router()
const c = new AuthController()

r.post('/register',       c.register)
r.post('/login',          c.login)
r.post('/refresh',        c.refresh)
r.post('/forgot-password', c.forgot)
r.post('/reset-password', c.reset)

export default r
