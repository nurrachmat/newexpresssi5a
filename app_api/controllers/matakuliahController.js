// impor model Matakuliah
const Matakuliah = require("../models/matakuliah")

// fungsi untuk mengambil semua mata kuliah
const getAllMatakuliah = async (req, res) => {
    try {
        // GET collection matakuliah dengan populate prodi dan fakultas
        const result = await Matakuliah.find().populate(
            [
                {
                    path: "prodi_id", 
                    select: "nama singkatan",  
                    populate: {
                        path: "fakultas_id", 
                        select: "nama singkatan"
                    } 
                }
            ]
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// fungsi untuk mengambil mata kuliah berdasarkan ID
const getMatakuliahById = async (req, res) => {
    try {
        const result = await Matakuliah.findById(req.params.id).populate(
            [
                {
                    path: "prodi_id", 
                    select: "nama singkatan",  
                    populate: {
                        path: "fakultas_id", 
                        select: "nama singkatan"
                    } 
                }
            ]
        )
        if (!result) {
            return res.status(404).json({message: "Mata kuliah tidak ditemukan"})
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// fungsi untuk menambahkan mata kuliah baru
const createMatakuliah = async (req, res) => {
    try {
        const matakuliah = new Matakuliah(req.body)
        const result = await matakuliah.save()
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// fungsi untuk mengupdate mata kuliah
const updateMatakuliah = async (req, res) => {
    try {
        const result = await Matakuliah.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!result) {
            return res.status(404).json({message: "Mata kuliah tidak ditemukan"})
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// fungsi untuk menghapus mata kuliah
const deleteMatakuliah = async (req, res) => {
    try {
        const result = await Matakuliah.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(404).json({message: "Mata kuliah tidak ditemukan"})
        }
        res.status(200).json({message: "Mata kuliah berhasil dihapus"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// export semua fungsi
module.exports = {
    getAllMatakuliah,
    getMatakuliahById,
    createMatakuliah,
    updateMatakuliah,
    deleteMatakuliah
}
