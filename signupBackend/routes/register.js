const express = require('express');
const bcrypt = require('bcryptjs'); // Zum sicheren Hashen des Passworts
const db = require('../../loginBackend/db'); // Zugriff auf zentrale DB

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, firstName } = req.body;

    if (!email || !password || !firstName) {
        return res.status(400).json({ message: 'E-Mail, Passwort und Vorname erforderlich.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUser = `INSERT INTO users (email, first_name, password) VALUES (?, ?, ?)`;

        db.run(insertUser, [email, firstName, hashedPassword], function (err) {
            if (err) {
                console.error('❌ Fehler bei Registrierung:', err.message);
                return res.status(400).json({
                    message: 'Fehler bei Registrierung: ' + err.message
                });
            }

            const userId = this.lastID;
                // Nach erfolgreicher Registrierung einen Stats-Eintrag anlegen
                        db.run(
                            'INSERT INTO user_stats (user_id, xp, total_seconds) VALUES (?, 0, 0)',
                            [userId],
                            (statsErr) => {
                                if (statsErr) {
                                    console.error('❌ Fehler beim Anlegen von user_stats:', statsErr.message);
                                    // Fehler beim Stats-Eintrag sollen Registrierung nicht verhindern
                                }
                            }
                        );


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
        console.error('❌ Fehler bei Passwort-Hashing:', e.message);
        res.status(500).json({ message: 'Interner Fehler bei der Registrierung.' });
    }
});

module.exports = router;
