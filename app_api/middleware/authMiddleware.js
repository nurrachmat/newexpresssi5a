const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    try {
        // Ambil token dari header
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Token tidak ditemukan'
            })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token tidak valid atau sudah expired'
        })
    }
}

module.exports = authMiddleware
