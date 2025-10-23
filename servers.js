// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- MongoDB ---
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing in env");
} else {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
}

// --- Firebase (optional) ---
if (process.env.FIREBASE_KEY) {
  try {
    const fb = JSON.parse(process.env.FIREBASE_KEY);
    admin.initializeApp({ credential: admin.credential.cert(fb) });
    console.log("✅ Firebase Admin initialized");
  } catch (err) {
    console.error("❌ Invalid FIREBASE_KEY:", err.message);
  }
}

// --- Routes ---
const userRoutes = require("./routes/users");
const reportRoutes = require("./routes/reports");

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// health & root
app.get("/health", (req, res) => res.status(200).send("OK"));
app.get("/", (req, res) => res.json({ message: "🚀 Backend Kinshasa opérationnel !" }));

// (optional) log defined routes to help debug on Render logs
if (process.env.NODE_ENV !== "production") {
  setTimeout(() => {
    try {
      app._router.stack.forEach(r => {
        if (r.route && r.route.path) console.log("route ->", Object.keys(r.route.methods).join(",").toUpperCase(), r.route.path);
      });
    } catch (e) { /* ignore */ }
  }, 500);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
