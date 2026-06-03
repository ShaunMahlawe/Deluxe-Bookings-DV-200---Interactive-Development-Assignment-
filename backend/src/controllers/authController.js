const bcrypt = require('bcryptjs')

const { isDatabaseConnected } = require('../config/db')
const User = require('../models/userSchema')
const { createUser, findUserByEmail, safeUser } = require('../utils/mockStore')
const { signToken } = require('../utils/token')

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function buildAuthResponse(userRecord) {
  if (userRecord._id) {
    return {
      id: userRecord._id.toString(),
      name: userRecord.name,
      email: userRecord.email,
    }
  }

  return safeUser(userRecord)
}

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  })
}

async function register(req, res) {
  const { name, email, password, signatureWord } = req.body

  if (!name || !email || !password || !signatureWord) {
    return res.status(400).json({ message: 'All registration fields are required.' })
  }

  const normalizedEmail = normalizeEmail(email)

  const existingUser = isDatabaseConnected()
    ? await User.findOne({ email: normalizedEmail })
    : findUserByEmail(normalizedEmail)

  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists.' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const signatureWordHash = await bcrypt.hash(signatureWord, 10)

  const user = isDatabaseConnected()
    ? await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        signatureWordHash,
      })
    : createUser({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        signatureWordHash,
      })

  const token = signToken(user._id ? user._id.toString() : user.id)
  setAuthCookie(res, token)

  return res.status(201).json({
    token,
    user: buildAuthResponse(user),
  })
}

async function login(req, res) {
  const { email, password, signatureWord } = req.body

  if (!email || !password || !signatureWord) {
    return res.status(400).json({ message: 'Email, password, and signature word are required.' })
  }

  const normalizedEmail = normalizeEmail(email)

  const user = isDatabaseConnected()
    ? await User.findOne({ email: normalizedEmail })
    : findUserByEmail(normalizedEmail)

  if (!user) {
    return res.status(401).json({ message: 'Invalid login credentials.' })
  }

  const passwordHash = user.passwordHash
  const signatureWordHash = user.signatureWordHash

  const passwordMatch = await bcrypt.compare(password, passwordHash)
  const signatureWordMatch = await bcrypt.compare(signatureWord, signatureWordHash)

  if (!passwordMatch || !signatureWordMatch) {
    return res.status(401).json({ message: 'Invalid login credentials.' })
  }

  const token = signToken(user._id ? user._id.toString() : user.id)
  setAuthCookie(res, token)

  return res.json({
    token,
    user: buildAuthResponse(user),
  })
}

function me(req, res) {
  return res.json({ user: req.user })
}

function logout(req, res) {
  res.clearCookie('token')
  return res.json({ message: 'Signed out.' })
}

module.exports = {
  login,
  logout,
  me,
  register,
}