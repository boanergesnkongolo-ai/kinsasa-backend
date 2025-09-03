const express = require("express");
const router = express.Router();

// GET route simple
router.get("/", (req, res) => {
  res.send("Bienvenue sur la route des utilisateurs !");
});

module.exports = router;
