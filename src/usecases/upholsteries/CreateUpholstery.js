export default class CreateUpholstery {
  constructor(upholsteryRepository) {
    this.upholsteryRepository = upholsteryRepository
  }
  async execute(payload) {
    return await this.upholsteryRepository.create(payload)
  }
}
