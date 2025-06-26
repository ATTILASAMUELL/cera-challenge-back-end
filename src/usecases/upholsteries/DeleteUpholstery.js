export default class DeleteUpholstery {
  constructor(upholsteryRepository) {
    this.upholsteryRepository = upholsteryRepository
  }
  async execute(id) {
    return await this.upholsteryRepository.delete(id)
  }
}
