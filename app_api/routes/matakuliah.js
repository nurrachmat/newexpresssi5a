const express = require("express")
const router = express.Router();

// impor matakuliahController
const matakuliahController = require("../controllers/matakuliahController")
const authMiddleware = require("../middleware/authMiddleware")

// route GET semua mata kuliah
router.get("/", matakuliahController.getAllMatakuliah)

// route GET mata kuliah berdasarkan ID
router.get("/:id", matakuliahController.getMatakuliahById)

// route POST untuk menambahkan mata kuliah baru
router.post("/", authMiddleware, matakuliahController.createMatakuliah)

// route PUT untuk mengupdate mata kuliah
router.put("/:id", matakuliahController.updateMatakuliah)

// route DELETE untuk menghapus mata kuliah
router.delete("/:id", matakuliahController.deleteMatakuliah)

// expor module
module.exports = router
