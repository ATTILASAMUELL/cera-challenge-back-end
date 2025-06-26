/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         ano:
 *           type: integer
 *           example: 2023
 *         marca:
 *           type: string
 *           example: Honda
 *         modelo:
 *           type: string
 *           example: Civic
 *         placa:
 *           type: string
 *           example: BRA2E19
 *         cor:
 *           type: string
 *           example: "#FFFFFF"
 *         categoria:
 *           type: string
 *           example: sedan
 *
 *     Upholstery:
 *       type: object
 *       properties:
 *         tipo:
 *           type: string
 *           example: Sofá 3 lugares
 *         tecido:
 *           type: string
 *           example: Linho
 *         cor:
 *           type: string
 *           example: "#C0C0C0"
 *         categoria:
 *           type: string
 *           example: sala-de-estar
 *
 *     Client:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nome:
 *           type: string
 *           example: Cliente 2
 *         cpf:
 *           type: string
 *           example: 111.111.111-11
 *         observacoes:
 *           type: string
 *           example: Um dos melhores clientes
 *         dataNascimento:
 *           type: string
 *           format: date-time
 *           example: 1990-05-25T03:00:00.000Z
 *         contato:
 *           type: object
 *           properties:
 *             codigoDDIWhatsapp:
 *               type: string
 *               example: "+55"
 *             paisWhatsapp:
 *               type: string
 *               example: Brasil
 *             whatsapp:
 *               type: string
 *               example: "(11) 11111-1111"
 *             email:
 *               type: string
 *               format: email
 *               example: cliente@dominio.com
 *         endereco:
 *           type: object
 *           properties:
 *             cep:
 *               type: string
 *               example: 11111-111
 *             estado:
 *               type: string
 *               example: SP
 *             cidade:
 *               type: string
 *               example: São Paulo
 *             rua:
 *               type: string
 *               example: R. Teste
 *             numero:
 *               type: integer
 *               example: 100
 *         veiculos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vehicle'
 *         estofados:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Upholstery'
 *
 *     ClientCreateDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/Client'
 *       required: [nome, cpf]
 *
 *     ClientUpdateDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/Client'
 */
