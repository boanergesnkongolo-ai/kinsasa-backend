// routes/users.js
const express = require("express");
const router = express.Router();

// Exemple de route GET
router.get("/", (req, res) => {
  res.json({ message: "Liste des utilisateurs" });
});

// Exemple de route POST
router.post("/", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: "Nouvel utilisateur créé", user: { name, email } });
});

module.exports = router;
