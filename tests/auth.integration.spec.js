import express from 'express'
import request from 'supertest'
import authRoutes from '../src/adapters/http/routes/authRoutes.js'

jest.mock('../src/adapters/http/controllers/AuthController.js', () => ({
  register: (req, res) => res.status(201).json({ id: '1', email: req.body.email }),
  login:    (req, res) => res.json({ accessToken: 'token', refreshToken: 'refresh' }),
  refresh:  (req, res) => res.json({ accessToken: 'newToken' }),
  forgot:   (req, res) => res.json({ message: 'ok' }),
  reset:    (req, res) => res.json({ message: 'ok' })
}))

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)

describe('Auth routes', () => {
  it('POST /auth/register → 201', async () => {
    await request(app)
      .post('/auth/register')
      .send({ email: 'ana@mail.com', password: '123456' })
      .expect(201)
      .expect(res => expect(res.body).toHaveProperty('id'))
  })

  it('POST /auth/login → 200', async () => {
    await request(app)
      .post('/auth/login')
      .send({ email: 'ana@mail.com', password: '123456' })
      .expect(200)
      .expect(res => expect(res.body).toHaveProperty('accessToken'))
  })

  it('POST /auth/refresh → 200', async () => {
    await request(app)
      .post('/auth/refresh')
      .send({ refreshToken: 'refresh' })
      .expect(200)
      .expect(res => expect(res.body.accessToken).toBe('newToken'))
  })

  it('POST /auth/forgot-password → 200', async () => {
    await request(app)
      .post('/auth/forgot-password')
      .send({ email: 'ana@mail.com' })
      .expect(200)
  })

  it('POST /auth/reset-password → 200', async () => {
    await request(app)
      .post('/auth/reset-password')
      .send({ token: 'abc', password: 'newpass' })
      .expect(200)
  })
})
