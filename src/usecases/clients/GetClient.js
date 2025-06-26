export default class GetClient {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }
  async execute(id) {
    return await this.clientRepository.findById(id)
  }
}
