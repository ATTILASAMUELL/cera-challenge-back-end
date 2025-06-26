import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger.js'
import { connectMongo } from './infrastructure/database.js'
import authRoutes from './adapters/http/routes/authRoutes.js'
import clientRoutes from './adapters/http/routes/clientRoutes.js'
import vehicleRoutes from './adapters/http/routes/vehicleRoutes.js'
import upholsteryRoutes from './adapters/http/routes/upholsteryRoutes.js'

dotenv.config()
await connectMongo()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use('/static/logos', express.static(path.join(__dirname, '../uploads/logos')))

app.use('/auth', authRoutes)
app.use('/clients', clientRoutes)
app.use('/vehicles', vehicleRoutes)
app.use('/upholsteries', upholsteryRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (_req, res) => {
  res.status(200).send(`
    <html>
      <head><title>Cera Challenge API</title></head>
      <body style="font-family:Arial;text-align:center;margin-top:60px">
        <img src="/static/logos/logo-cera.png" alt="Logo" style="height:120px"><br>
        <h1>Cera Challenge API</h1>
        <p>Bem-vindo!</p>
      </body>
    </html>
  `)
})

app.use((_req, res) => {
  res.status(404).send(`
    <html>
      <head><title>404 – Não encontrado</title></head>
      <body style="font-family:Arial;text-align:center;margin-top:60px">
        <h1>404 – Rota não encontrada</h1>
      </body>
    </html>
  `)
})

app.listen(process.env.PORT || 3000, '0.0.0.0')
