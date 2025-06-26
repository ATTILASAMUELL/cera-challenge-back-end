import { UserModel } from './models/UserModel.js'
import { User } from '../../domain/entities/User.js'

function toEntity (doc) {
  if (!doc) return null
  const { _id, ...rest } = doc.toObject()
  return new User({ id: _id.toString(), ...rest })
}

export class UserRepositoryImpl {
  async findByEmail (email) {
    return toEntity(await UserModel.findOne({ email }))
  }

  async create (u) {
    const doc = await UserModel.create({
      _id: u.id,
      email: u.email,
      passwordHash: u.passwordHash
    })
    return toEntity(doc)
  }

  async update (u) {
    const doc = await UserModel.findByIdAndUpdate(
      u.id,
      { ...u },
      { new: true }
    )
    return toEntity(doc)
  }

  async findByRefreshToken (token) {
    return toEntity(await UserModel.findOne({ refreshToken: token }))
  }

  async findByResetToken (token) {
    return toEntity(
      await UserModel.findOne({
        resetToken: token,
        resetExpires: { $gt: new Date() }
      })
    )
  }
}
