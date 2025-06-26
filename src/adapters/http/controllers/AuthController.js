/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints de autenticação
 */
import { UserRepositoryImpl } from '../../persistence/UserRepositoryImpl.js'
import { RegisterUser }   from '../../../usecases/auth/RegisterUser.js'
import { LoginUser }      from '../../../usecases/auth/LoginUser.js'
import { RefreshToken }   from '../../../usecases/auth/RefreshToken.js'
import { RecoverPassword } from '../../../usecases/auth/RecoverPassword.js'
import { ok, fail } from '../../../utils/response.js'

export default class AuthController {
  constructor() {
    const repo = new UserRepositoryImpl()
    this.reg = new RegisterUser(repo)
    this.log = new LoginUser(repo)
    this.ref = new RefreshToken(repo)
    this.rec = new RecoverPassword(repo)
  }

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/components/schemas/RegisterDTO' }
   *     responses:
   *       201: { description: Usuário criado }
   *       400: { description: Erro de validação }
   */
  register = async (req, res) => {
    try {
      const user = await this.reg.execute(req.body)
      return ok(res, { user }, 201)
    } catch (e) {
      return fail(res, e.message)
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Autentica usuário e devolve tokens + dados do usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/components/schemas/LoginDTO' }
   *     responses:
   *       200: { description: Tokens gerados }
   *       400: { description: Credenciais inválidas }
   */
  login = async (req, res) => {
    try {
      const { tokens, user } = await this.log.execute(req.body)
      return ok(res, { tokens, user })
    } catch (e) {
      return fail(res, e.message)
    }
  }

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Gera novo access-token usando refresh-token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/components/schemas/RefreshDTO' }
   *     responses:
   *       200: { description: Novo access-token }
   *       400: { description: Refresh-token inválido }
   */
  refresh = async (req, res) => {
    try {
      const { tokens, user } = await this.ref.execute(req.body)
      return ok(res, { tokens, user })
    } catch (e) {
      return fail(res, e.message)
    }
  }

  /**
   * @swagger
   * /auth/forgot-password:
   *   post:
   *     summary: Envia e-mail de recuperação de senha
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/components/schemas/ForgotDTO' }
   *     responses:
   *       200: { description: Mensagem de confirmação }
   *       400: { description: Erro de validação }
   */
  forgot = async (req, res) => {
    try {
      await this.rec.forgot(req.body)
      return ok(res, { message: 'Se existir conta enviaremos instruções' })
    } catch (e) {
      return fail(res, e.message)
    }
  }

  /**
   * @swagger
   * /auth/reset-password:
   *   post:
   *     summary: Redefine a senha usando token recebido por e-mail
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema: { $ref: '#/components/schemas/ResetDTO' }
   *     responses:
   *       200: { description: Senha alterada }
   *       400: { description: Token inválido ou expirado }
   */
  reset = async (req, res) => {
    try {
      await this.rec.reset(req.body)
      return ok(res, { message: 'Senha alterada' })
    } catch (e) {
      return fail(res, e.message)
    }
  }
}
