const mongoose = require('mongoose') // impor mongoose

// skema untuk collection mata kuliah
const matakuliahSchema = new mongoose.Schema({
    kode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nama: {
        type: String,
        required: true, // wajib diisi
        trim: true
    },
    sks: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    prodi_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prodi",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// sertakan skema matakuliah ke dalam model Matakuliah
const Matakuliah = mongoose.model("Matakuliah", matakuliahSchema)
// expor model Matakuliah
module.exports = Matakuliah
