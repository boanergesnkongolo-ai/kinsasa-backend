```js
// Import des modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

// Charger les variables d'environnement (fichier .env)
dotenv.config();

// Initialiser Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Création de l'application Express
const app = express();

// Middleware pour lire du JSON
app.use(express.json());

// URL de connexion MongoDB (soit depuis .env, soit fallback local)
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kinshasaDB";

// Connexion à MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Route test
app.get("/", (req, res) => {
  res.send("Bienvenue sur le backend Kinshasa 🚀");
});

// Port du serveur (depuis .env ou 5000 par défaut)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
```
