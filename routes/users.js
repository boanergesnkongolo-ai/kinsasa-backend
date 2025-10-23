// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("GET /api/users error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST create user
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "name and email required" });

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("POST /api/users error:", err.message);
    // duplicate key handling
    if (err.code === 11000) return res.status(409).json({ message: "Email already exists" });
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
