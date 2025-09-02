// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const cors = require("cors");

// Initialisation Express
const app = express();
app.use(express.json());
app.use(cors());

// 🔗 Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connecté à MongoDB Atlas"))
.catch(err => console.error("❌ Erreur MongoDB :", err));

// 🔑 Initialisation Firebase Admin
if (process.env.FIREBASE_KEY) {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
  });
  console.log("✅ Firebase Admin initialisé");
}

// Import des routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Route test
app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend Kinshasa opérationnel !" });
});

// Route health check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur en ligne sur le port ${PORT}`));
