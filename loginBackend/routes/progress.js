const express = require('express');
const jwt = require('jsonwebtoken');
const { saveProgress, getProgressByUser } = require('../models/progress');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = 'dein_geheimer_token_schlüssel'; // In Produktion: aus .env

// Middleware zur Token-Authentifizierung
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 🟢 Fortschritt speichern & XP erhöhen
router.post('/', authenticateToken, (req, res) => {
  const { lessonId, percent } = req.body;
  const userId = req.user.id;

  // 1. Fortschritt speichern
  saveProgress(userId, lessonId, percent, (err) => {
    if (err) return res.status(500).json({ message: 'Fehler beim Speichern des Fortschritts' });

    // 2. XP hinzufügen (z. B. 20 XP)
    const xpToAdd = 20;

    const query = `UPDATE user_stats SET xp = xp + ? WHERE user_id = ?`;

    db.run(query, [xpToAdd, userId], (xpErr) => {
      if (xpErr) {
        console.error('❌ Fehler beim Hinzufügen von XP:', xpErr.message);
        return res.status(500).json({ message: 'Fortschritt gespeichert, aber XP nicht erhöht' });
      }

      // 3. Erfolgsmeldung zurückgeben
      res.status(200).json({
        message: '✅ Fortschritt & XP gespeichert',
        addedXp: xpToAdd
      });
    });
  });
});

// 🟡 Fortschritt abrufen
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;

  getProgressByUser(userId, (err, data) => {
    if (err) return res.status(500).json({ message: 'Fehler beim Abrufen des Fortschritts' });
    res.status(200).json(data);
  });
});

module.exports = router;
