const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 👉 zentrale DB im Projekt-Root:
const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ DB-Verbindung fehlgeschlagen:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Mit SQLite-Datenbank verbunden.');
    }
});

// Tabelle: users
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
`);
// Tabelle: progress (Lernfortschritt pro Lektion)
db.run(`
    CREATE TABLE IF NOT EXISTS progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        lesson_id INTEGER,
        percent INTEGER,
        UNIQUE(user_id, lesson_id)
    )
`);

// Tabelle: button_progress (einmalige Verstanden-Klicks)
db.run(`
    CREATE TABLE IF NOT EXISTS button_progress (
        user_id INTEGER,
        button_id TEXT,
        PRIMARY KEY(user_id, button_id)
    )
`);

// Tabelle: user_stats (gesammelte XP)
db.run(`
    CREATE TABLE IF NOT EXISTS user_stats (
        user_id INTEGER PRIMARY KEY,
       xp INTEGER DEFAULT 0,
              total_seconds INTEGER DEFAULT 0
    )
`);


module.exports = db;
