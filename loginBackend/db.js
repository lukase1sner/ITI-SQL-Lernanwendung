const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Datenbank-Datei erstellen/öffnen
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Datenbankverbindung fehlgeschlagen:', err.message);
  } else {
    console.log('Mit SQLite-Datenbank verbunden.');
  }
});

// Tabelle: Benutzer
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// Tabelle: Fortschritt
db.run(`
  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    lesson_id INTEGER,
    percent INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

module.exports = db;
