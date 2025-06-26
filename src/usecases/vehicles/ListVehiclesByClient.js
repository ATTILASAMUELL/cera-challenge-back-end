export default class ListVehiclesByClient {
  constructor (vehicleRepository) {
    this.vehicleRepository = vehicleRepository
  }

  async execute (clientId) {
    return this.vehicleRepository.findAllByClient(clientId)
  }
}
