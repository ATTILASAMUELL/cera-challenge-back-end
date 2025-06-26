import { Router } from 'express'
import UpholsteryRepositoryImpl from '../../persistence/UpholsteryRepositoryImpl.js'
import UpholsteryController from '../controllers/UpholsteryController.js'

const repo = new UpholsteryRepositoryImpl()
const controller = new UpholsteryController(repo)
const r = Router()

r.post('/', controller.create)
r.get('/client/:idCliente', controller.listByClient)
r.get('/:id', controller.show)
r.put('/:id', controller.update)
r.delete('/:id', controller.delete)

export default r
