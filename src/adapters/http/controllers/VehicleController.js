import CreateVehicle from '../../../usecases/vehicles/CreateVehicle.js'
import ListVehiclesByClient from '../../../usecases/vehicles/ListVehiclesByClient.js'
import GetVehicle from '../../../usecases/vehicles/GetVehicle.js'
import UpdateVehicle from '../../../usecases/vehicles/UpdateVehicle.js'
import DeleteVehicle from '../../../usecases/vehicles/DeleteVehicle.js'

export default class VehicleController {
  constructor (vehicleRepository) {
    this.createVehicle = new CreateVehicle(vehicleRepository)
    this.listByClientUseCase = new ListVehiclesByClient(vehicleRepository)
    this.getVehicle = new GetVehicle(vehicleRepository)
    this.updateVehicle = new UpdateVehicle(vehicleRepository)
    this.deleteVehicle = new DeleteVehicle(vehicleRepository)
  }

  create = async (req, res) => {
    const vehicle = await this.createVehicle.execute(req.body)
    return res.status(201).json(vehicle)
  }

  listByClient = async (req, res) => {
    const list = await this.listByClientUseCase.execute(req.params.idCliente)
    return res.json(list)
  }

  show = async (req, res) => {
    const vehicle = await this.getVehicle.execute(req.params.id)
    return vehicle ? res.json(vehicle) : res.sendStatus(404)
  }

  update = async (req, res) => {
    const updated = await this.updateVehicle.execute(req.params.id, req.body)
    return updated ? res.json(updated) : res.sendStatus(404)
  }

  delete = async (req, res) => {
    const removed = await this.deleteVehicle.execute(req.params.id)
    return removed ? res.sendStatus(204) : res.sendStatus(404)
  }
}
