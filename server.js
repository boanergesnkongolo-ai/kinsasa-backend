require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connecté à MongoDB Atlas"))
.catch(err => console.error("❌ Erreur MongoDB :", err));

// Routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Route test
app.get("/", (req, res) => res.json({ message: "🚀 Backend minimaliste opérationnel !" }));

// Lancer serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur en ligne sur le port ${PORT}`));
