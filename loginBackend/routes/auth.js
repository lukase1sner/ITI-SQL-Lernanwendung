// --------------------- Imports ---------------------

const express = require('express');                      // Webframework
const bcrypt = require('bcrypt');                       // Für Passwort-Hashing
const jwt = require('jsonwebtoken');                    // Für Token-Generierung
const { createUser, getUserByEmail } = require('../models/user'); // Datenbankfunktionen

const router = express.Router();                        // Neuer Router für Auth-Routen

// HINWEIS: Für Produktion sollte das geheim bleiben (z. B. über process.env.JWT_SECRET)
const JWT_SECRET = 'dein_geheimer_token_schlüssel';

// --------------------- Registrierung ---------------------

router.post('/register', async (req, res) => {
  const { firstName, email, password } = req.body;

  // Prüfen, ob die E-Mail bereits registriert ist
  getUserByEmail(email, async (err, user) => {
    if (user) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }

    try {
      // Passwort sicher hashen
      const hashedPassword = await bcrypt.hash(password, 10);

      // Benutzer anlegen
      createUser(firstName, email, hashedPassword, (err, newUser) => {
        if (err) {
          return res.status(500).json({ message: 'Fehler bei Registrierung' });
        }

        // Erfolgreich registriert
        res.status(201).json({
          message: 'Registrierung erfolgreich',
          user: newUser
        });
      });
    } catch (hashErr) {
      res.status(500).json({ message: 'Fehler beim Hashen des Passworts' });
    }
  });
});

// --------------------- Login ---------------------

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Benutzer anhand der E-Mail suchen
  getUserByEmail(email, async (err, user) => {
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    try {
      // Passwort prüfen
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: 'Falsches Passwort' });
      }

      // JWT erzeugen – enthält ID und E-Mail, gültig für 1 Stunde
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Token, ID und Vorname senden
      res.status(200).json({ token, userId: user.id, firstName: user.first_name });
    } catch (compareErr) {
      res.status(500).json({ message: 'Fehler beim Verifizieren des Passworts' });
    }
  });
});

module.exports = router;
