const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');  // Import von bcrypt für das Passwort-Hashing

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL-Verbindung
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // Hier deinen MySQL-Nutzer eintragen
  password: 'W3!x7dKvN2R',     // Hier dein MySQL-Passwort eintragen
  database: 'sqlmate'
});

db.connect(err => {
  if (err) {
    console.error('Datenbankverbindung fehlgeschlagen:', err);
  } else {
    console.log('Mit MySQL verbunden.');
  }
});

// Registrierungshandler
app.post('/signup', (req, res) => {
  const { vorname, nachname, email, passwort } = req.body;

  // Generiere ein Salt und hash das Passwort
  bcrypt.hash(passwort, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Fehler beim Hashen des Passworts:', err);
      return res.status(500).send('Fehler beim Hashen des Passworts');
    }

    // Führe die SQL-Abfrage aus, um den Benutzer mit dem gehashten Passwort zu speichern
    const sql = 'INSERT INTO benutzer (vorname, nachname, email, passwort) VALUES (?, ?, ?, ?)';
    db.query(sql, [vorname, nachname, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Fehler beim Einfügen:', err);
        return res.status(500).send('Fehler beim Speichern');
      } else {
        res.send('Benutzer erfolgreich registriert');
      }
    });
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
