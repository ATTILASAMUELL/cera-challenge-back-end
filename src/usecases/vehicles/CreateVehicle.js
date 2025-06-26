export default class CreateVehicle {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository
  }
  async execute(payload) {
    return await this.vehicleRepository.create(payload)
  }
}
