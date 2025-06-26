import ClientModel from './models/ClientModel.js'
import VehicleModel from './models/VehicleModel.js'
import UpholsteryModel from './models/UpholsteryModel.js'

export default class ClientRepositoryImpl {
  async create (data) {
    const { _id, id, ...clean } = data
    return ClientModel.create(clean)
  }

  async findAll () {
    return ClientModel.find()
  }

  async findById (id) {
    return ClientModel.findById(id)
  }

  async update (id, data) {
    const { _id, id: ignore, ...clean } = data
    return ClientModel.findByIdAndUpdate(id, clean, { new: true })
  }

  async delete (id) {
    await Promise.all([
      VehicleModel.deleteMany({ idCliente: id }),
      UpholsteryModel.deleteMany({ idCliente: id })
    ])
    return ClientModel.findByIdAndDelete(id)
  }
}
