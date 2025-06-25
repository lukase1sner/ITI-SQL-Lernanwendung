// --------------------- Imports ---------------------

const express = require('express');
const bcrypt = require('bcryptjs'); // Zum sicheren Hashen des Passworts
const db = require('../../loginBackend/db'); // Zugriff auf SQLite-Datenbank

const router = express.Router(); // Neuer Router für Registrierungs-Endpunkt

// --------------------- POST /register ---------------------

/**
 * Registrierung eines neuen Benutzers.
 * - Speichert Nutzer in `users`-Tabelle
 */
router.post('/register', async (req, res) => {
    const { email, password, firstName } = req.body;

    // Validierung: Felder müssen ausgefüllt sein
    if (!email || !password || !firstName) {
        return res.status(400).json({ message: 'E-Mail, Passwort und Vorname erforderlich.' });
    }

    try {
        // 🔐 Passwort hashen (10 Salt-Runden)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Benutzer in Datenbank einfügen
        const insertUser = `INSERT INTO users (email, first_name, password) VALUES (?, ?, ?)`;

        db.run(insertUser, [email, firstName, hashedPassword], function (err) {
            if (err) {
                console.error('❌ Fehler bei Registrierung:', err.message);
                return res.status(400).json({
                    message: 'Fehler bei Registrierung: ' + err.message
                });
            }

            // ✅ Erfolg: Benutzer wurde gespeichert
            const userId = this.lastID;

            res.status(201).json({
                message: '✅ Registrierung erfolgreich!',
                user: {
                    id: userId,
                    email,
                    first_name: firstName
                }
            });
        });

    } catch (e) {
        // Fehler beim Hashing
        console.error('❌ Fehler bei Passwort-Hashing:', e.message);
        res.status(500).json({ message: 'Interner Fehler bei der Registrierung.' });
    }
});

module.exports = router;
