export default class CreateClient {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }
  async execute(payload) {
    return await this.clientRepository.create(payload)
  }
}
