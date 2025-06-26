import jwt from 'jsonwebtoken'

export class RefreshToken {
  constructor(repo) {
    this.repo = repo
  }

  #newAccess(id) {
    return jwt.sign(
      { sub: id },
      process.env.JWT_SECRET,
      { expiresIn: +process.env.JWT_EXPIRES_IN }
    )
  }

  async execute({ refreshToken }) {
    let payload
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    } catch {
      throw new Error('Token inválido')
    }

    const user = await this.repo.findByRefreshToken(refreshToken)
    if (!user || user.id !== payload.sub) throw new Error('Token inválido')

    const accessToken = this.#newAccess(user.id)

    const safeUser = {
      id:    user.id,
      name:  user.name,
      email: user.email
    }

    return {
      tokens: { accessToken, refreshToken },
      user: safeUser
    }
  }
}
