import express from 'express'
import request from 'supertest'
import ClientController from '../src/adapters/http/controllers/ClientController.js'

const fakeRepo = {
  create: async data => ({ id: '1', ...data }),
  findAll: async () => [{ id: '1', name: 'Ana' }],
  findById: async id => (id === '1' ? { id: '1', name: 'Ana' } : null),
  update: async (id, data) => (id === '1' ? { id: '1', ...data } : null),
  delete: async () => {}
}

const controller = new ClientController(fakeRepo)

const router = express.Router()
router.post('/', controller.create)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

const app = express()
app.use(express.json())
app.use('/clients', router)

describe('Client routes', () => {
  it('POST /clients → 201', async () => {
    await request(app)
      .post('/clients')
      .send({ name: 'Ana' })
      .expect(201)
      .expect(res => expect(res.body).toMatchObject({ id: '1', name: 'Ana' }))
  })

  it('GET /clients → 200', async () => {
    await request(app)
      .get('/clients')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(1))
  })

  it('GET /clients/1 → 200', async () => {
    await request(app)
      .get('/clients/1')
      .expect(200)
      .expect(res => expect(res.body.id).toBe('1'))
  })

  it('GET /clients/999 → 404', async () => {
    await request(app).get('/clients/999').expect(404)
  })

  it('PUT /clients/1 → 200', async () => {
    await request(app)
      .put('/clients/1')
      .send({ name: 'Ana Maria' })
      .expect(200)
      .expect(res => expect(res.body.name).toBe('Ana Maria'))
  })

  it('PUT /clients/999 → 404', async () => {
    await request(app).put('/clients/999').send({ name: 'X' }).expect(404)
  })

  it('DELETE /clients/1 → 204', async () => {
    await request(app).delete('/clients/1').expect(204)
  })
})
