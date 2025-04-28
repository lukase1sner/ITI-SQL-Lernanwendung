const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// MySQL-Datenbankverbindung
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'W3!x7dKvN2R',           // Dein MySQL-Passwort (falls gesetzt)
  database: 'sqlmate'     // Der Name deiner Datenbank
});

db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
    return;
  }
  console.log('Datenbank verbunden');
});

// Login-Route
app.post('/login', (req, res) => {
  const { email, passwort } = req.body;

  const sql = 'SELECT * FROM benutzer WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Fehler bei der Datenbankabfrage:', err);
      return res.status(500).send('Fehler beim Login');
    }

    if (results.length === 0) {
      return res.status(401).send('Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.');
    }

    const user = results[0];

    // Passwort-Vergleich mit bcrypt
    const passwortStimmt = await bcrypt.compare(passwort, user.passwort);

    if (passwortStimmt) {
      res.send('Login erfolgreich');
    } else {
      res.status(401).send('Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.');
    }
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
