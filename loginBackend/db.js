// --------------------- Imports ---------------------

const sqlite3 = require('sqlite3').verbose(); // Aktiviert ausführliches Debugging
const path = require('path');

// --------------------- Datenbankverbindung ---------------------

// Pfad zur SQLite-Datei (erstellt oder öffnet sie im Projektverzeichnis)
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Datenbankverbindung fehlgeschlagen:', err.message);
  } else {
    console.log('✅ Mit SQLite-Datenbank verbunden.');
  }
});

// --------------------- Tabellen-Definitionen ---------------------

// 🔐 Tabelle: Benutzerkonten
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Eindeutige ID
    email TEXT UNIQUE,                     -- E-Mail muss eindeutig sein
    password TEXT                          -- Gespeichertes (gehashtes) Passwort
  )
`);

// 📊 Tabelle: Lernfortschritt pro Lektion
db.run(`
  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Fortschritts-ID (intern)
    user_id INTEGER,                       -- Verweis auf Benutzer
    lesson_id INTEGER,                     -- ID der Lektion
    percent INTEGER,                       -- Fortschritt in %
    FOREIGN KEY(user_id) REFERENCES users(id) -- Beziehung zum Benutzer
  )
`);

// 🧠 Tabelle: Gesamtstatistiken des Nutzers
db.run(`
  CREATE TABLE IF NOT EXISTS user_stats (
    user_id INTEGER PRIMARY KEY,           -- Benutzer-ID = Primärschlüssel (1:1-Beziehung)
    level INTEGER DEFAULT 0,               -- Level (Gamification)
    xp INTEGER DEFAULT 0,                  -- Erfahrungspunkte
    total_time TEXT DEFAULT '0h 0min',     -- Zeit als String gespeichert (z. B. „1h 45min“)
    FOREIGN KEY(user_id) REFERENCES users(id) -- Referenz auf Benutzer
  )
`);

// --------------------- Export ---------------------

// Exportieren der Datenbankinstanz für andere Module
module.exports = db;
