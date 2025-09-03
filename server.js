const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import des routes
const userRoutes = require("./routes/users");

// Utilisation des routes
app.use("/api/users", userRoutes);

// Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Boanergès !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
