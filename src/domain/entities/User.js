export class User {
  constructor({ id, email, passwordHash, refreshToken, resetToken, resetExpires }) {
    this.id = id
    this.email = email
    this.passwordHash = passwordHash
    this.refreshToken = refreshToken
    this.resetToken = resetToken
    this.resetExpires = resetExpires
  }
}
