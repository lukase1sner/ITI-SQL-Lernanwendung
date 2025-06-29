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

db.run(`
    CREATE TABLE IF NOT EXISTS user_progresschatbot (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        topic TEXT NOT NULL,
        progress INTEGER NOT NULL DEFAULT 0,
        UNIQUE(user_id, topic)
    )
`);

module.exports = db;