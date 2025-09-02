const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.error('Erreur MongoDB:', err));

// Schémas Mongoose
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: { lat: Number, lng: Number }
});
const User = mongoose.model('User', UserSchema);

const ReportSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  photoUrl: String,
  location: { lat: Number, lng: Number },
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now }
});
const Report = mongoose.model('Report', ReportSchema);

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  timestamp: { type: Date, default: Date.now }
});
const News = mongoose.model('News', NewsSchema);

// Routesapp.get('/', (req, res) => {
  res.send('Kinshasa Backend is running!');
});

app.post('/users/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'Utilisateur créé !', user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user) res.send(user);
    else res.status(404).send({ message: 'Utilisateur non trouvé' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post('/reports', async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).send({ message: 'Signalement créé !', report });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.send(reports);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/news', async (req, res) => {
  try {
    const news = await News.find();
    res.send(news);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);
});
