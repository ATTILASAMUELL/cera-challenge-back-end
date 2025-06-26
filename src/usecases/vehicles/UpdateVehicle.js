export default class UpdateVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository
  }
  async execute(id, data) {
    return await this.vehicleRepository.update(id, data)
  }
}
