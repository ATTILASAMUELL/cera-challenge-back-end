import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    refreshToken: String,
    resetToken: String,
    resetExpires: Date
  },
  { timestamps: true }
)

export const UserModel = model('User', UserSchema)
