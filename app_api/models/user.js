const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// skema untuk collection user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email tidak valid']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Hash password sebelum save
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next()
    }
    
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// Method untuk membandingkan password
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (error) {
        throw error
    }
}

// Jangan return password saat toJSON
userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.password
    return user
}

// sertakan skema user ke dalam model User
const User = mongoose.model("User", userSchema)
// expor model User
module.exports = User
