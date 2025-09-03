// Exemple simple de modèle (sans base de données, juste en mémoire)

class Report {
  constructor({ title, description, createdAt }) {
    this.id = Date.now(); // ID unique basé sur le timestamp
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
  }
}

module.exports = Report;
