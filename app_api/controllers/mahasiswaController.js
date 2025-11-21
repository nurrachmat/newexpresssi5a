// impor model Mahasiswa
const Mahasiswa = require("../models/mahasiswa");

// fungsi untuk mengambil isi collection mahasiswa
const getAllMahasiswa = async (req, res) => {
  try {
    // GET collection mahasiswa
    // const result = await Mahasiswa.find().populate("prodi_id", "nama singkatan")
    const result = await Mahasiswa.find().populate([
      {
        path: "prodi_id",
        select: "nama singkatan",
        populate: {
          path: "fakultas_id",
          select: "nama singkatan",
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fungsi untuk mengambil mahasiswa berdasarkan ID
const getMahasiswaById = async (req, res) => {
  try {
    const result = await Mahasiswa.findById(req.params.id).populate([
      {
        path: "prodi_id",
        select: "nama singkatan",
        populate: {
          path: "fakultas_id",
          select: "nama singkatan",
        },
      },
    ]);
    if (!result) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fungsi untuk membuat mahasiswa baru
const createMahasiswa = async (req, res) => {
  try {
    const mahasiswa = new Mahasiswa({
      npm: req.body.npm,
      nama: req.body.nama,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      prodi_id: req.body.prodi_id,
    });

    const result = await mahasiswa.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// fungsi untuk mengupdate mahasiswa
const updateMahasiswa = async (req, res) => {
  try {
    const result = await Mahasiswa.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    // update field jika ada dalam request
    if (req.body.npm != null) {
      result.npm = req.body.npm;
    }
    if (req.body.nama != null) {
      result.nama = req.body.nama;
    }
    if (req.body.tempat_lahir != null) {
      result.tempat_lahir = req.body.tempat_lahir;
    }
    if (req.body.tanggal_lahir != null) {
      result.tanggal_lahir = req.body.tanggal_lahir;
    }
    if (req.body.prodi_id != null) {
      result.prodi_id = req.body.prodi_id;
    }

    const updateMahasiswa = await result.save();
    res.status(200).json(updateMahasiswa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// fungsi untuk menghapus mahasiswa
const deleteMahasiswa = async (req, res) => {
  try {
    const result = await Mahasiswa.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }
    await result.deleteOne();
    res.status(200).json({ message: "Mahasiswa berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export
module.exports = {
  getAllMahasiswa,
  getMahasiswaById,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
};
