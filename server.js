require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connecté à MongoDB Atlas"))
.catch(err => console.error("❌ Erreur MongoDB :", err));

// Firebase Admin
if (process.env.FIREBASE_KEY) {
  const firebaseConfig = JSON.parse(process.env.FIREBASE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
  });
  console.log("✅ Firebase Admin initialisé");
}

// Routes
const userRoutes = require("./routes/users");
const reportRoutes = require("./routes/reports");

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// Routes test
app.get("/", (req, res) => res.json({ message: "🚀 Backend Kinshasa opérationnel !" }));
app.get("/health", (req, res) => res.status(200).send("OK"));

// Lancement serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur en ligne sur le port ${PORT}`));
