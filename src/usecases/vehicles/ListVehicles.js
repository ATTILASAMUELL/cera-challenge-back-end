export default class ListVehicles {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository
  }
  async execute(idCliente) {
    return await this.vehicleRepository.findAllByClient(idCliente)
  }
}
