require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err.message));

// Initialisation Firebase (optionnelle)
if (process.env.FIREBASE_KEY) {
  try {
    const firebaseConfig = JSON.parse(process.env.FIREBASE_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig)
    });
    console.log("✅ Firebase initialisé");
  } catch (error) {
    console.error("⚠️ Clé Firebase invalide :", error.message);
  }
}

// Import des routes
const userRoutes = require("./routes/users");
const reportRoutes = require("./routes/reports");

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "🚀 Backend Kinshasa opérationnel !" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur en ligne sur le port ${PORT}`));
