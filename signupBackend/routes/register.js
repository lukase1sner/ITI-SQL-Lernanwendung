// --------------------- Imports ---------------------

const express = require('express');
const bcrypt = require('bcryptjs'); // Zum sicheren Hashen des Passworts
const db = require('../../loginBackend/db'); // Zugriff auf SQLite-Datenbank

const router = express.Router(); // Neuer Router für Registrierungs-Endpunkt

// --------------------- POST /register ---------------------

/**
 * Registrierung eines neuen Benutzers.
 * - Speichert Nutzer in `users`-Tabelle
 * - Initialisiert einen Eintrag in `user_stats`
 */
router.post('/register', async (req, res) => {
  const { firstName, email, password } = req.body;

  // Validierung: Beide Felder müssen ausgefüllt sein
  if (!firstName || !email || !password) {
    return res.status(400).json({ message: 'Vorname, E-Mail und Passwort erforderlich.' });
  }

  try {
    // 🔐 Passwort hashen (10 Salt-Runden)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Schritt 1: Benutzer in Datenbank einfügen
    const insertUser = `INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)`;

    db.run(insertUser, [firstName, email, hashedPassword], function (err) {
      if (err) {
        // Fehler z. B. bei doppelter E-Mail (UNIQUE constraint)
        console.error('❌ Fehler bei Registrierung:', err.message);
        return res.status(400).json({ message: 'Benutzer existiert bereits.' });
      }

      // Neue Benutzer-ID aus der Datenbank (AUTOINCREMENT-Wert)
      const userId = this.lastID;

      // Schritt 2: Benutzer-Statistiken initialisieren
      const insertStats = `
        INSERT INTO user_stats (user_id, level, xp, total_time)
        VALUES (?, 0, 0, '0h 0min')
      `;

      db.run(insertStats, [userId], (statsErr) => {
        if (statsErr) {
          console.error('❌ Fehler bei user_stats:', statsErr.message);
          return res.status(500).json({ message: 'Registrierung unvollständig (Stats).' });
        }

        // ✅ Erfolg: Benutzer und Statistik wurden gespeichert
        res.status(201).json({
          message: '✅ Registrierung erfolgreich!',
          user: {
            id: userId,
            first_name: firstName,
            email
          }
        });
      });
    });

  } catch (e) {
    // Fehler beim Hashing
    console.error('❌ Fehler bei Passwort-Hashing:', e.message);
    res.status(500).json({ message: 'Interner Fehler bei der Registrierung.' });
  }
});

module.exports = router;
