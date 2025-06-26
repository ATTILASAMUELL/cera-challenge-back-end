import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export async function connectMongo () {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB conectado')
  } catch (err) {
    console.error('Erro ao conectar no Mongo:', err.message)
    process.exit(1)
  }
}
