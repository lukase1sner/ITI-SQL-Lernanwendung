const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = 'dein_geheimer_token_schlüssel'; // In Produktion via .env

// 🔐 Token prüfen
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

// 🟢 Benutzerstatistiken abrufen (XP, Level, Zeit etc.)
router.get('/stats', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const query = `SELECT xp, total_time FROM user_stats WHERE user_id = ?`;

  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('❌ Fehler beim Abrufen der Statistiken:', err.message);
      return res.status(500).json({ message: 'Fehler beim Abrufen der Statistiken' });
    }

    if (!row) {
      return res.status(404).json({ message: 'Keine Statistiken gefunden' });
    }

    // 🎯 XP → Level-Berechnung
    const xp = row.xp;
    const level = Math.floor(xp / 100);
    const currentXp = xp % 100;
    const progressPercent = Math.round((currentXp / 100) * 100);

    // 🟢 Antwort senden
    res.status(200).json({
      xp,
      level,
      currentXp,
      xpToNext: 100 - currentXp,
      progressPercent,
      total_time: row.total_time
    });
  });
});

module.exports = router;
