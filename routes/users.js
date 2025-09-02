// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET : tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("❌ Erreur GET /users :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST : ajouter un utilisateur
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Erreur POST /users :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
