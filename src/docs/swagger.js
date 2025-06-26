import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const root = path.join(__dirname, '..')

const apiBaseUrl = process.env.SWAGGER_SERVER_URL || 'http://201.54.21.170:3000'

export default swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cera Challenge API',
      version: '1.0.0',
      description: 'API protegida por JWT Bearer'
    },
    servers: [{ url: apiBaseUrl }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },

  apis: [
    path.join(root, 'adapters/http/**/*.js')  
  ]
})
