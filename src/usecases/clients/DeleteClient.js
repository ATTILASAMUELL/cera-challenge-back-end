export default class DeleteClient {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }
  async execute(id) {
    return await this.clientRepository.delete(id)
  }
}
