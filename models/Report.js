const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  status: { type: String, default: "nouveau" }  // statut : nouveau, en cours, traité
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
