import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { sendMail } from '../../adapters/email/NodemailerService.js'

export class RecoverPassword {
  constructor(repo) {
    this.repo = repo
    this.TTL = 60 * 60 * 1000 
  }

  async forgot({ email }) {
    const user = await this.repo.findByEmail(email)
    if (!user) return

    const resetToken   = uuidv4()
    const resetExpires = new Date(Date.now() + this.TTL)

    await this.repo.update(user.id, { resetToken, resetExpires })

    await sendMail(
      user.email,
      'Recuperação de senha',
      `Token de redefinição: ${resetToken}`
    )
  }

  async reset({ token, password }) {
    const user = await this.repo.findByResetToken(token)
    const expired = !user || user.resetExpires < new Date()

    if (expired) throw new Error('Token inválido ou expirado')

    const passwordHash = await bcrypt.hash(password, 10)

    await this.repo.update(user.id, {
      passwordHash,
      resetToken: null,
      resetExpires: null
    })
  }
}
