import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginUser {
  constructor(repo) {
    this.repo = repo
  }

  #generateTokens(id) {
    const accessToken = jwt.sign(
      { sub: id },
      process.env.JWT_SECRET,
      { expiresIn: +process.env.JWT_EXPIRES_IN }
    )

    const refreshToken = jwt.sign(
      { sub: id },
      process.env.REFRESH_SECRET,
      { expiresIn: +process.env.REFRESH_EXPIRES_IN }
    )

    return { accessToken, refreshToken }
  }

  async execute({ email, password }) {
    const user = await this.repo.findByEmail(email)
    if (!user) throw new Error('Credenciais inválidas')

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) throw new Error('Credenciais inválidas')

    const tokens = this.#generateTokens(user.id)

    await this.repo.update(user.id, { refreshToken: tokens.refreshToken })

    const safeUser = {
      id:   user.id,
      name: user.name,
      email: user.email
    }

    return { tokens, user: safeUser }
  }
}
