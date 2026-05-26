const jwt = require('jsonwebtoken')

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '1d',
  })
}

module.exports = {
  signToken,
}