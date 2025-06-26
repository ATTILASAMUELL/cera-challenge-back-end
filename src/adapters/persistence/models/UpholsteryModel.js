import mongoose from 'mongoose'

const UpholsterySchema = new mongoose.Schema(
  {
    idCliente: { type: mongoose.Types.ObjectId, ref: 'Client', required: true },
    tipo: String,
    tecido: String,
    cor: String,
    categoria: String
  },
  { timestamps: true }
)

export default mongoose.model('Upholstery', UpholsterySchema)
