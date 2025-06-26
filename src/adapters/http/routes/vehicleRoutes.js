import { Router } from 'express'
import VehicleRepositoryImpl from '../../persistence/VehicleRepositoryImpl.js'
import VehicleController from '../controllers/VehicleController.js'

const repo = new VehicleRepositoryImpl()
const controller = new VehicleController(repo)
const r = Router()

r.post('/', controller.create)
r.get('/client/:idCliente', controller.listByClient)
r.get('/:id', controller.show)
r.put('/:id', controller.update)
r.delete('/:id', controller.delete)

export default r
