class Report {
  constructor({ title, description, createdAt }) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
  }
}

module.exports = Report;
