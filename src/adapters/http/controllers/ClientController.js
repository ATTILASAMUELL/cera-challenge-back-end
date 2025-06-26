import { ok, fail } from '../../../utils/response.js'
import mongoose from 'mongoose'

import CreateClient from '../../../usecases/clients/CreateClient.js'
import DeleteClient from '../../../usecases/clients/DeleteClient.js'
import GetClient from '../../../usecases/clients/GetClient.js'
import ListClients from '../../../usecases/clients/ListClients.js'
import UpdateClient from '../../../usecases/clients/UpdateClient.js'

const isValidId = id => mongoose.Types.ObjectId.isValid(id)

export default class ClientController {
  constructor (clientRepository) {
    this.createClient = new CreateClient(clientRepository)
    this.deleteClient = new DeleteClient(clientRepository)
    this.getClient = new GetClient(clientRepository)
    this.listClients = new ListClients(clientRepository)
    this.updateClient = new UpdateClient(clientRepository)
  }

  /**
   * @swagger
   * /clients:
   *   post:
   *     summary: Cria um cliente
   *     security: [{ bearerAuth: [] }]
   *     tags: [Clients]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/components/schemas/ClientCreateDTO' }
   *     responses:
   *       201: { description: Cliente criado }
   *       400: { description: Erro de validação }
   *       401: { description: Token ausente ou inválido }
   */
  create = async (req, res) => {
    try {
      const { _id, id, ...data } = req.body
      const client = await this.createClient.execute(data)
      return ok(res, client, 201)
    } catch (e) {
      return fail(res, e.message)
    }
  }

  /**
   * @swagger
   * /clients:
   *   get:
   *     summary: Lista todos os clientes
   *     security: [{ bearerAuth: [] }]
   *     tags: [Clients]
   *     responses:
   *       200:
   *         description: Array de clientes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items: { $ref: '#/components/schemas/Client' }
   *       401: { description: Token ausente ou inválido }
   */
  index = async (_req, res) => {
    try {
      const list = await this.listClients.execute()
      return ok(res, list)
    } catch (e) {
      return fail(res, e.message)
    }
  }

  /**
   * @swagger
   * /clients/{id}:
   *   get:
   *     summary: Busca cliente por ID
   *     security: [{ bearerAuth: [] }]
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       200: { description: Cliente encontrado }
   *       400: { description: ID inválido }
   *       404: { description: Não encontrado }
   *       401: { description: Token ausente ou inválido }
   */
  show = async (req, res) => {
    const { id } = req.params
    if (!isValidId(id)) return fail(res, 'ID inválido', 400)
    try {
      const client = await this.getClient.execute(id)
      return client ? ok(res, client) : fail(res, 'Não encontrado', 404)
    } catch (e) {
      return fail(res, e.message)
    }
  }

  /**
   * @swagger
   * /clients/{id}:
   *   put:
   *     summary: Atualiza cliente
   *     security: [{ bearerAuth: [] }]
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/components/schemas/ClientUpdateDTO' }
   *     responses:
   *       200: { description: Cliente atualizado }
   *       400: { description: ID inválido }
   *       404: { description: Não encontrado }
   *       401: { description: Token ausente ou inválido }
   */
  update = async (req, res) => {
    const { id } = req.params
    if (!isValidId(id)) return fail(res, 'ID inválido', 400)
    const { _id, ...data } = req.body
    try {
      const updated = await this.updateClient.execute(id, data)
      return updated ? ok(res, updated) : fail(res, 'Não encontrado', 404)
    } catch (e) {
      return fail(res, e.message)
    }
  }

  /**
   * @swagger
   * /clients/{id}:
   *   delete:
   *     summary: Remove cliente
   *     security: [{ bearerAuth: [] }]
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       204: { description: Excluído com sucesso }
   *       400: { description: ID inválido }
   *       404: { description: Não encontrado }
   *       401: { description: Token ausente ou inválido }
   */
  delete = async (req, res) => {
    const { id } = req.params
    if (!isValidId(id)) return fail(res, 'ID inválido', 400)
    try {
      const removed = await this.deleteClient.execute(id)
      return removed ? ok(res, null, 204) : fail(res, 'Não encontrado', 404)
    } catch (e) {
      return fail(res, e.message)
    }
  }
}
