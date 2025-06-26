export default class ListUpholsteries {
  constructor(upholsteryRepository) {
    this.upholsteryRepository = upholsteryRepository
  }
  async execute(idCliente) {
    return await this.upholsteryRepository.findAllByClient(idCliente)
  }
}
