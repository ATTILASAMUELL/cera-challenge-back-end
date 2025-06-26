import mongoose from 'mongoose'

const VehicleSchema = new mongoose.Schema(
  {
    idCliente: { type: mongoose.Types.ObjectId, ref: 'Client', required: true },
    marca: String,
    modelo: String,
    placa: String,
    ano: Number
  },
  { timestamps: true }
)

export default mongoose.model('Vehicle', VehicleSchema)
