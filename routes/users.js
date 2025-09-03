const express = require("express");
const router = express.Router();
const Report = require("../models/reports");

// GET : tous les signalements
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST : créer un signalement
router.post("/report", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Titre et description requis." });
    }

    const newReport = new Report({ title, description });
    await newReport.save();

    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
