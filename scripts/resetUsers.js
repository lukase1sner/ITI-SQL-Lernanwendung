const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 👉 zentrale DB im Root:
const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ DB-Verbindung fehlgeschlagen:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Mit SQLite-Datenbank verbunden.');
    }
});

db.serialize(() => {
    db.run('DELETE FROM users', function (err) {
        if (err) {
            console.error('❌ Fehler beim Löschen:', err.message);
        } else {
            console.log(`✅ ${this.changes} User gelöscht.`);
        }
    });
});

db.close(() => {
    console.log('✅ DB-Verbindung geschlossen.');
});
