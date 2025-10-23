// models/Report.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  status: { type: String, enum: ["nouveau","en cours","traité"], default: "nouveau" }
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
