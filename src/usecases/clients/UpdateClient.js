export default class UpdateClient {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }
  async execute(id, data) {
    return await this.clientRepository.update(id, data)
  }
}
