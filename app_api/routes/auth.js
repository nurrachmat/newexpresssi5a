const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

// Route untuk register
router.post('/register', authController.register)

// Route untuk login
router.post('/login', authController.login)

// Route untuk get profile (protected route - contoh penggunaan middleware)
router.get('/profile', authMiddleware, authController.getProfile)

module.exports = router
