import bcrypt from 'bcrypt'
import { User } from '../../domain/entities/User.js'

export class RegisterUser {
  constructor(repo) {
    this.repo = repo
  }

  async execute({ name, email, password }) {
    const duplicated = await this.repo.findByEmail(email)
    if (duplicated) throw new Error('E-mail em uso')

    const passwordHash = await bcrypt.hash(password, 10)

    const userEntity = new User({ name, email, passwordHash })

    const saved = await this.repo.create(userEntity)

    return {
      id: saved.id,
      name: saved.name,
      email: saved.email
    }
  }
}
