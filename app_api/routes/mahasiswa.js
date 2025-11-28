const express = require("express");
const router = express.Router();

// impor mahasiswaController
const mahasiswaController = require("../controllers/mahasiswaController");
const authMiddleware = require("../middleware/authMiddleware");

// route GET semua mahasiswa
router.get("/", mahasiswaController.getAllMahasiswa);

// route GET mahasiswa berdasarkan ID
router.get("/:id", mahasiswaController.getMahasiswaById);

// route POST untuk menambahkan mahasiswa baru
router.post("/", mahasiswaController.createMahasiswa);

// route PUT untuk mengupdate mahasiswa
router.put("/:id", mahasiswaController.updateMahasiswa);

// route DELETE untuk menghapus mahasiswa
router.delete("/:id", mahasiswaController.deleteMahasiswa);

// expor module
module.exports = router;
