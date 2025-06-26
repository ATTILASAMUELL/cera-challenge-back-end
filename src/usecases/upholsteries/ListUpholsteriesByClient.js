export default class ListUpholsteriesByClient {
  constructor (upholsteryRepository) {
    this.upholsteryRepository = upholsteryRepository
  }

  async execute (clientId) {
    return this.upholsteryRepository.findAllByClient(clientId)
  }
}
