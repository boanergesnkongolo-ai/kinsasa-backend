import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

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

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

app.get("/", (req, res) => {
  res.send("🚀 Backend Kinshasa opérationnel !");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API en ligne et prête !" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);} catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
