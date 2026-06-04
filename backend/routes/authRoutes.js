const express = require('express')

const {
  deleteAccount,
  login,
  logout,
  me,
  profile,
  register,
  updateProfile,
} = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', protect, me)
router.get('/profile', protect, profile)
router.put('/update', protect, updateProfile)
router.delete('/delete', protect, deleteAccount)

module.exports = router
