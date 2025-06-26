export default class GetVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository
  }
  async execute(id) {
    return await this.vehicleRepository.findById(id)
  }
}
