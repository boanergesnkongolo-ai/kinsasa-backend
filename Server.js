import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import admin from "firebase-admin";
import serviceAccount from "./firebaseKey.json" assert { type: "json" };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connexion MongoDB établie"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// Initialiser Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Route test
app.get("/", (req, res) => {
  res.send("✅ Serveur backend opérationnel !");
});
