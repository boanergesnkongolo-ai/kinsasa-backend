require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const admin = require("firebase-admin");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
app.use("/api/users", userRoutes);

// Route test
app.get("/", (req, res) => res.json({ message: "🚀 Backend Kinshasa opérationnel !" }));

// Lancer serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur en ligne sur le port ${PORT}`));
