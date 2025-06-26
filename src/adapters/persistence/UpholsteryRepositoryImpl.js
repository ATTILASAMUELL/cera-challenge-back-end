import UpholsteryModel from './models/UpholsteryModel.js'

export default class UpholsteryRepositoryImpl {
  async create(data) {
    return await UpholsteryModel.create(data)
  }
  async findAllByClient(idCliente) {
    return await UpholsteryModel.find({ idCliente })
  }
  async findById(id) {
    return await UpholsteryModel.findById(id)
  }
  async update(id, data) {
    return await UpholsteryModel.findByIdAndUpdate(id, data, { new: true })
  }
  async delete(id) {
    return await UpholsteryModel.findByIdAndDelete(id)
  }
}
