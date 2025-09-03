const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Liste des utilisateurs" });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: "Nouvel utilisateur créé", user: { name, email } });
});

module.exports = router;
