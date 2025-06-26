import VehicleModel from './models/VehicleModel.js'

export default class VehicleRepositoryImpl {
  async create(data) {
    return await VehicleModel.create(data)
  }
  async findAllByClient(idCliente) {
    return await VehicleModel.find({ idCliente })
  }
  async findById(id) {
    return await VehicleModel.findById(id)
  }
  async update(id, data) {
    return await VehicleModel.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    return await VehicleModel.findByIdAndDelete(id)
  }
}
