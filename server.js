import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Résolution des chemins
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Initialisation Firebase
try {
  if (!process.env.FIREBASE_KEY) {
    throw new Error("⚠️ La clé FIREBASE_KEY est manquante dans .env");
  }

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY)),
  });

  console.log("✅ Firebase Admin initialisé");
} catch (error) {
  console.error("❌ Erreur Firebase :", error.message);
}

// Middlewares
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// Routes simples
app.get("/", (req, res) => {
  res.send("🚀 Backend Kinshasa opérationnel !");
});

app.get("/api/test", (req, res) => {res.json({ message: "API en ligne et prête !" });
});

// Nouvelle route /api/users
app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Jean", email: "jean@example.com" },
    { id: 2, name: "Marie", email: "marie@example.com" },
    { id: 3, name: "Paul", email: "paul@example.com" }
  ];
  res.json(users);
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
