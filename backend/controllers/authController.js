const bcrypt = require('bcryptjs')

const { isDatabaseConnected } = require('../config/db')
const { User } = require('../models')
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
      userRole: userRecord.userRole,
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

function normalizePublicRole(userRole) {
  return ['B', 'S'].includes(userRole) ? userRole : 'B'
}

async function register(req, res) {
  const { name, email, password, signatureWord, userRole } = req.body

  if (!name || !email || !password) {
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
  const signatureWordHash = signatureWord ? await bcrypt.hash(signatureWord, 10) : undefined

  const user = isDatabaseConnected()
    ? await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        signatureWordHash,
        userRole: normalizePublicRole(userRole),
      })
    : createUser({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        signatureWordHash,
        userRole: normalizePublicRole(userRole),
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

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
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
  const signatureWordMatch = signatureWordHash && signatureWord
    ? await bcrypt.compare(signatureWord, signatureWordHash)
    : true

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

function profile(req, res) {
  return res.json(req.user)
}

async function updateProfile(req, res) {
  const { name, email, userRole } = req.body
  const canSetRole = req.user.userRole === 'A'
    ? ['B', 'S', 'A'].includes(userRole)
    : ['B', 'S'].includes(userRole)

  if (isDatabaseConnected()) {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(name ? { name: name.trim() } : {}),
        ...(email ? { email: normalizeEmail(email) } : {}),
        ...(canSetRole ? { userRole } : {}),
      },
      { new: true, runValidators: true },
    )

    if (!user) {
      return res.status(404).json({ message: 'User account not found.' })
    }

    return res.json({ user: buildAuthResponse(user) })
  }

  return res.status(501).json({ message: 'Profile updates require MongoDB mode.' })
}

async function deleteAccount(req, res) {
  if (isDatabaseConnected()) {
    await User.findByIdAndDelete(req.user.id)
    res.clearCookie('token')
    return res.json({ message: 'Account deleted.' })
  }

  return res.status(501).json({ message: 'Account deletion requires MongoDB mode.' })
}

function logout(req, res) {
  res.clearCookie('token')
  return res.json({ message: 'Signed out.' })
}

module.exports = {
  login,
  logout,
  me,
  profile,
  register,
  updateProfile,
  deleteAccount,
}
