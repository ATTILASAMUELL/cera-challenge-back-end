import CreateUpholstery from '../../../usecases/upholsteries/CreateUpholstery.js'
import ListUpholsteriesByClient from '../../../usecases/upholsteries/ListUpholsteriesByClient.js'
import GetUpholstery from '../../../usecases/upholsteries/GetUpholstery.js'
import UpdateUpholstery from '../../../usecases/upholsteries/UpdateUpholstery.js'
import DeleteUpholstery from '../../../usecases/upholsteries/DeleteUpholstery.js'

export default class UpholsteryController {
  constructor (upholsteryRepository) {
    this.createUpholstery = new CreateUpholstery(upholsteryRepository)
    this.listByClientUseCase = new ListUpholsteriesByClient(upholsteryRepository)
    this.getUpholstery = new GetUpholstery(upholsteryRepository)
    this.updateUpholstery = new UpdateUpholstery(upholsteryRepository)
    this.deleteUpholstery = new DeleteUpholstery(upholsteryRepository)
  }

  create = async (req, res) => {
    const item = await this.createUpholstery.execute(req.body)
    return res.status(201).json(item)
  }

  listByClient = async (req, res) => {
    const list = await this.listByClientUseCase.execute(req.params.idCliente)
    return res.json(list)
  }

  show = async (req, res) => {
    const item = await this.getUpholstery.execute(req.params.id)
    return item ? res.json(item) : res.sendStatus(404)
  }

  update = async (req, res) => {
    const updated = await this.updateUpholstery.execute(req.params.id, req.body)
    return updated ? res.json(updated) : res.sendStatus(404)
  }

  delete = async (req, res) => {
    const removed = await this.deleteUpholstery.execute(req.params.id)
    return removed ? res.sendStatus(204) : res.sendStatus(404)
  }
}
