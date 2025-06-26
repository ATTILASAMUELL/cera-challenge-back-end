export default class UpdateUpholstery {
  constructor(upholsteryRepository) {
    this.upholsteryRepository = upholsteryRepository
  }
  async execute(id, data) {
    return await this.upholsteryRepository.update(id, data)
  }
}
