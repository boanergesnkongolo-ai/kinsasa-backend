const express = require("express");
const router = express.Router();
const Report = require("../models/reports");

// Exemple : tester la route
router.get("/", (req, res) => {
  res.send("Bienvenue sur la route des utilisateurs !");
});

// Exemple : créer un rapport
router.post("/report", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Titre et description requis." });
    }

    const newReport = new Report({
      title,
      description,
      createdAt: new Date(),
    });

    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
