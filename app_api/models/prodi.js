const mongoose = require("mongoose"); // impor mongosee

// skema untuk collection prodi
const prodiSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true, // wajib diisi
      trim: true,
    },
    singkatan: {
      type: String,
      required: true,
      trim: true,
    },
    fakultas_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fakultas",
      required: true,
    },
  },
  {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
  }
);
// sertakan skema prodi ke dalam model Prodi
const Prodi = mongoose.model("Prodi", prodiSchema);
// expor model Prodi
module.exports = Prodi;
