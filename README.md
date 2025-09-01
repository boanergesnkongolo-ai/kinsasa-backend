Kinshasa Backend

Backend Node.js pour l'application Kinshasa Services Municipaux.

Fonctionnalités

- API REST avec Express.js
- Connexion à MongoDB (via Mongoose)
- Intégration Firebase Admin (pour notifications ou autres services)
- Gestion des variables d'environnement via `.env`

Structure du projet

```
kinsasa-backend/
├── Firebasekey.json         # Clé de service Firebase
├── Mongo/                   # Connexion à MongoDB
│   └── mongo.js
├── Server.js                # Fichier principal du serveur Express
├── package.json             # Dépendances et scripts
├── .gitignore               # Fichiers ignorés par git
├── README.md                # Description du projet
```

Installation locale

```bash
git clone https://github.com/ton-utilisateur/kinsasa-backend.git
cd kinsasa-backend
npm install
npm start
```

Déploiement

Déployé sur Render :  
https://kinsasa-backend.onrender.com
