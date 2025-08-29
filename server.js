const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();
app.use(bodyParser.json());

// Firebase admin initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Schema for a report
const reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model('Report', reportSchema);

// Routes
app.get('/', (req, res) => {
  res.send("Backend Kinshasa App is running!");
});

app.post('/reports', async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();

    // Send push notification
    const message = {
      notification: {
        title: "Nouveau signalement",
        body: report.title,
      },
      topic: "all_users",
    };
    await admin.messaging().send(message);

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
