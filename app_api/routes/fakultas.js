const express = require("express")
const router = express.Router();

// impor fakultasController
const fakultasController = require("../controllers/fakultasController")
const authMiddleware = require("../middleware/authMiddleware")

// route fakultas
router.get("/", fakultasController.getAllFakultas)
router.post("/", fakultasController.createFakultas)
// router.post("/", authMiddleware, fakultasController.createFakultas)
router.get("/:id", fakultasController.getFakultasById)
router.delete("/:id", fakultasController.deleteFakultasById)
router.patch("/:id", fakultasController.updateFakultasById)

// expor module
module.exports = router
