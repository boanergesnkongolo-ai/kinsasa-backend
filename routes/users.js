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

    // Ici on pourra envoyer une notification Firebase
    // admin.messaging().send(...)

    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH : mettre à jour le statut d’un signalement
router.patch("/report/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["nouveau", "en cours", "traité"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedReport) return res.status(404).json({ message: "Signalement non trouvé" });
    res.json(updatedReport);

    // Ici on pourra envoyer une notification Firebase
    // admin.messaging().send(...)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
