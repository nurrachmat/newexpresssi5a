// impor model Prodi
const Prodi = require("../models/prodi");

// fungsi untuk mengambil isi collection prodi
const getAllProdi = async (req, res) => {
  try {
    // GET collection prodi
    const result = await Prodi.find().populate("fakultas_id", "nama singkatan");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fungsi untuk mengambil prodi berdasarkan ID
const getProdiById = async (req, res) => {
  try {
    const result = await Prodi.findById(req.params.id).populate(
      "fakultas_id",
      "nama singkatan"
    );
    if (!result) {
      return res.status(404).json({ message: "Prodi tidak ditemukan" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fungsi untuk membuat prodi baru
const createProdi = async (req, res) => {
  try {
    // buat instance prodi baru
    const prodi = new Prodi({
      nama: req.body.nama,
      singkatan: req.body.singkatan,
      fakultas_id: req.body.fakultas_id,
    });

    // simpan data prodi ke dalam collection
    const hasil = await prodi.save();
    // beri response json HTTP_CREATED
    res.status(201).json(hasil);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// fungsi untuk mengupdate prodi
const updateProdi = async (req, res) => {
  try {
    const result = await Prodi.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Prodi tidak ditemukan" });
    }

    // update field jika ada dalam request
    if (req.body.nama != null) {
      result.nama = req.body.nama;
    }
    if (req.body.singkatan != null) {
      result.singkatan = req.body.singkatan;
    }
    if (req.body.fakultas_id != null) {
      result.fakultas_id = req.body.fakultas_id;
    }

    const updateProdi = await result.save();
    res.status(200).json(updateProdi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// fungsi untuk menghapus prodi
const deleteProdi = async (req, res) => {
  try {
    const result = await Prodi.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Prodi tidak ditemukan" });
    }
    await result.deleteOne();
    res.status(200).json({ message: "Prodi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export
module.exports = {
  getAllProdi,
  getProdiById,
  createProdi,
  updateProdi,
  deleteProdi,
};
