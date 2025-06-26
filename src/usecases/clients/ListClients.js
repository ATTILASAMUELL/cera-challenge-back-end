export default class ListClients {
  constructor(clientRepository) {
    this.clientRepository = clientRepository
  }
  async execute() {
    return await this.clientRepository.findAll()
  }
}
