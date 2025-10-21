// impor model Fakultas
const fakultasSchema = require("../models/fakultas")

// fungsi untuk mengambil isi collection fakultas
const getAllFakultas = async (req, res) => {
    try {
        // GET collection fakultas
        const result = await fakultasSchema.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createFakultas = async (req, res) => {
    // buat instance fakultas baru
    const fakultas = new fakultasSchema({
        nama: req.body.nama,
        singkatan: req.body.singkatan
    })

    // simpan data fakultas ke dalam collection
    const hasil = await fakultas.save();
    // beri response json HTTP_CREATED
    res.status(201).json(hasil);
}

// export 
module.exports = {getAllFakultas, createFakultas}