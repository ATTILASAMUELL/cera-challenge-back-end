export default class GetUpholstery {
  constructor(upholsteryRepository) {
    this.upholsteryRepository = upholsteryRepository
  }
  async execute(id) {
    return await this.upholsteryRepository.findById(id)
  }
}
