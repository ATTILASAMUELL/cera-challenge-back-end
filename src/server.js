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
const swaggerUrl = `${process.env.SWAGGER_SERVER_URL || 'http://localhost:3000'}/docs`
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
      <head>
        <title>Cera Challenge API</title>
        <style>
          body {
            margin: 0;
            background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
            color: white;
            font-family: 'Arial', sans-serif;
            text-align: center;
            overflow: hidden;
          }
          .stars {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: transparent;
            z-index: 0;
          }
          .stars::before {
            content: '';
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            box-shadow:
              10vw 10vh white,
              30vw 20vh white,
              50vw 30vh white,
              70vw 10vh white,
              90vw 40vh white,
              20vw 60vh white,
              40vw 80vh white,
              60vw 70vh white;
            animation: blink 2s infinite ease-in-out alternate;
          }
          @keyframes blink {
            from { opacity: 1; }
            to { opacity: 0.3; }
          }
          .container {
            position: relative;
            z-index: 1;
            padding-top: 80px;
          }
          .logo {
            height: 120px;
          }
          .author-img {
            height: 100px;
            border-radius: 50%;
            margin-top: 40px;
          }
          .btn {
            margin-top: 30px;
            padding: 12px 24px;
            background: #00c6ff;
            color: #000;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            text-decoration: none;
            transition: background 0.3s ease;
          }
          .btn:hover {
            background: #0072ff;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="stars"></div>
        <div class="container">
          <img src="/static/logos/logo-cera.png" alt="Logo" class="logo"><br>
          <h1>Cera Challenge API</h1>
          <p>Bem-vindo!</p>
          <a href="${swaggerUrl}" class="btn" target="_blank">Ir para documentação da API</a>
          <div>
            <img src="/static/logos/attila.jpg" alt="Attila Tabory" class="author-img"><br>
            <p style="margin-top:10px;font-weight:bold">Autor: Attila Tabory</p>
          </div>
        </div>
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
