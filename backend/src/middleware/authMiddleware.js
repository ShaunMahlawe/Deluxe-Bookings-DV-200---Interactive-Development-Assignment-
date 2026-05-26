const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { isDatabaseConnected } = require('../config/db')
const { findUserById, safeUser } = require('../utils/mockStore')

async function protect(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const bearerToken = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null
  const token = bearerToken || req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')

    if (isDatabaseConnected()) {
      const user = await User.findById(payload.sub).select('-passwordHash -signatureWordHash')

      if (!user) {
        return res.status(401).json({ message: 'User account not found.' })
      }

      req.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      }

      return next()
    }

    const user = findUserById(payload.sub)

    if (!user) {
      return res.status(401).json({ message: 'Demo user account not found.' })
    }

    req.user = safeUser(user)
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

module.exports = {
  protect,
}