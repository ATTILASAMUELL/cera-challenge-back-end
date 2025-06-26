/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDTO:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name:
 *           type: string
 *           example: João da Silva
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: Passw0rd
 *
 *     LoginDTO:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *         password:
 *           type: string
 *           format: password
 *           example: Passw0rd
 *
 *     RefreshDTO:
 *       type: object
 *       required: [refreshToken]
 *       properties:
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     ForgotDTO:
 *       type: object
 *       required: [email]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: joao@email.com
 *
 *     ResetDTO:
 *       type: object
 *       required: [token, password]
 *       properties:
 *         token:
 *           type: string
 *           example: 123456
 *         password:
 *           type: string
 *           format: password
 *           example: NovaSenha123
 */
