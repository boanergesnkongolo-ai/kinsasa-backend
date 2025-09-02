const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// GET : tous les signalements
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    console.error("❌ Erreur GET /reports :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET : un signalement par ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Signalement non trouvé" });
    res.json(report);
  } catch (error) {
    console.error("❌ Erreur GET /reports/:id :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST : créer un signalement
router.post("/", async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const newReport = new Report({ title, description, location });
    await newReport.save();
    res.status(201).json(newReport);

    // Ici on pourra envoyer une notification Firebase plus tard
    // admin.messaging().send(...)

  } catch (error) {
    console.error("❌ Erreur POST /reports :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// PATCH : mettre à jour le statut d’un signalement
router.patch("/:id", async (req, res) => {
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

    // Ici on pourra envoyer une notification Firebase si on veut
    // admin.messaging().send(...)

  } catch (error) {
    console.error("❌ Erreur PATCH /reports/:id :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
