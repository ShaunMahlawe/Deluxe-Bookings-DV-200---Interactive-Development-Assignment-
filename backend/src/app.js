const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')

const { isDatabaseConnected } = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const listingRoutes = require('./routes/listingRoutes')
const sellerRoutes = require('./routes/sellerRoutes')
const catalogRoutes = require('./routes/catalogRoutes')
const propertyRoutes = require('./routes/propertyRoutes')
const thingsToDoRoutes = require('./routes/thingsToDoRoutes')
const staysRoutes = require('./routes/staysRoutes')
const { buildStaysOpenApi } = require('./docs/staysOpenApi')

// const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean)

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
]

const configuredOrigins = String(process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...configuredOrigins]))

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

// app.get('/api/health', (_req, res) => {
//   res.json({ status: 'ok', mode: isDatabaseConnected() ? 'mongo' : 'demo' })
// })

app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/catalog', catalogRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/things-to-do', thingsToDoRoutes)

app.get('/api/stays/openapi.json', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`
  res.json(buildStaysOpenApi(baseUrl))
})

app.get("/", (req, res) => {
  res.send("Deluxe Bookings API is running");
}); 

app.use('/api/stays/docs', swaggerUi.serve, (req, res, next) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`
  const openApiDocument = buildStaysOpenApi(baseUrl)
  const swaggerHandler = swaggerUi.setup(openApiDocument, {
    explorer: true,
    customSiteTitle: 'Deluxe Stays API Docs',
  })

  return swaggerHandler(req, res, next)
})

app.use('/api/stays', staysRoutes)

// app.use((err, _req, res, _next) => {
//   console.error(err)
//   res.status(500).json({ message: 'Unexpected server error.' })
// })

module.exports = app
