const express = require("express")
const router = express.Router();

// impor prodiController
const prodiController = require("../controllers/prodiController")

// route GET prodi
router.get("/", prodiController.getAllProdi)

// expor module
module.exports = router