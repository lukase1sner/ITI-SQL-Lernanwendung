const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/user');

const router = express.Router();
const JWT_SECRET = 'dein_geheimer_token_schlüssel'; // In Produktion: .env-Datei verwenden!

// Registrierung
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Prüfen ob Email schon existiert
  getUserByEmail(email, async (err, user) => {
    if (user) return res.status(400).json({ message: 'Benutzer existiert bereits' });

    const hashedPassword = await bcrypt.hash(password, 10);
    createUser(email, hashedPassword, (err, newUser) => {
      if (err) return res.status(500).json({ message: 'Fehler bei Registrierung' });
      res.status(201).json({ message: 'Registrierung erfolgreich', user: newUser });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, async (err, user) => {
    if (!user) return res.status(404).json({ message: 'Benutzer nicht gefunden' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Falsches Passwort' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user.id });
  });
});

module.exports = router;
