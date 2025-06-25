// loginBackend/db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 👉 zentrale SQLite-Datei im Projektroot
const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Datenbankverbindung fehlgeschlagen:', err.message);
    } else {
        console.log('✅ Mit SQLite-Datenbank verbunden.');
    }
});

// 🧑 Tabelle: Benutzerkonten
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
`);

module.exports = db;
