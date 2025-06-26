import { Router } from 'express'
import ClientRepositoryImpl from '../../persistence/ClientRepositoryImpl.js'
import ClientController from '../controllers/ClientController.js'
import { jwtGuard } from '../middlewares/auth.js'
import {
  createClientRules,
  updateClientRules
} from '../validators/clientValidator.js'

const repo = new ClientRepositoryImpl()
const controller = new ClientController(repo)

const r = Router()

r.use(jwtGuard)

r.post('/', createClientRules, controller.create)
r.get('/', controller.index)
r.get('/:id', controller.show)
r.put('/:id', updateClientRules, controller.update)
r.delete('/:id', controller.delete)

export default r
