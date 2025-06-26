import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    observacoes: String,
    contato: {
      telefone: String,
      celular: String,
      email: String
    },
    endereco: {
      rua: String,
      numero: String,
      complemento: String,
      bairro: String,
      cidade: String,
      estado: String,
      cep: String
    }
  },
  { timestamps: true }
)

export default mongoose.model('Client', ClientSchema)
