// const express = require('express')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')

// const authRoutes = require('./routes/authRoutes')
// const bookingRoutes = require('./routes/bookingRoutes')
// const reviewRoutes = require('./routes/reviewRoutes')

// const app = express()

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true,
//   }),
// )
// app.use(express.json())
// app.use(cookieParser())

// app.get('/api/health', (_req, res) => {
//   res.json({ status: 'ok', mode: process.env.MONGODB_URI ? 'mongo' : 'demo' })
// })

// app.use('/api/auth', authRoutes)
// app.use('/api/bookings', bookingRoutes)
// app.use('/api/reviews', reviewRoutes)

// app.use((err, _req, res, _next) => {
//   console.error(err)
//   res.status(500).json({ message: 'Unexpected server error.' })
// })

// module.exports = app