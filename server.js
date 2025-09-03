// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import des routes
const userRoutes = require("./routes/users");
const reportRoutes = require("./routes/reports");

// Utilisation des routes
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Boanergès !");
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
