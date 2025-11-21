const express = require("express");
const router = express.Router();

// impor prodiController
const prodiController = require("../controllers/prodiController");
const authMiddleware = require("../middleware/authMiddleware");

// route GET semua prodi
router.get("/", prodiController.getAllProdi);

// route GET prodi berdasarkan ID
router.get("/:id", prodiController.getProdiById);

// route POST untuk menambahkan prodi baru
router.post("/", authMiddleware, prodiController.createProdi);

// route PUT untuk mengupdate prodi
router.put("/:id", authMiddleware, prodiController.updateProdi);

// route DELETE untuk menghapus prodi
router.delete("/:id", authMiddleware, prodiController.deleteProdi);

// expor module
module.exports = router;
