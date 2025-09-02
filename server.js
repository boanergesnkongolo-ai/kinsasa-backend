const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.log(err));

// Schémas
const UserSchema = new mongoose.Schema({name: String,
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
  status: { type: String, default: "pending" },
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

// Routes API
app.post('/users/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: 'Utilisateur créé !', user });
});

app.post('/users/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) res.send(user);
  else res.status(404).send({ message: 'Utilisateur non trouvé' });
});

app.post('/reports', async (req, res) => {
  const report = new Report(req.body);
  await report.save();

  // Notification push
  const message = {
    notification: {
      title: "Nouveau signalement",body: `report.title a été signalé à Kinshasa`
    ,
    topic: 'all_users'
  ;

  admin.messaging().send(message)
    .then(response => console.log('Notification envoyée : ', response))
    .catch(error => console.log('Erreur notification : ', error));

  res.send( message: 'Signalement créé !', report );
);

app.get('/reports', async (req, res) => 
  const reports = await Report.find();
  res.send(reports);
);

app.get('/news', async (req, res) => 
  const news = await News.find();
  res.send(news);
);

// Route d'upload d'image
app.post('/upload', upload.single('image'), (req, res) => 
  res.send( message: 'Fichier reçu', file: req.file );
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port{PORT}`));
