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

    const query = `INSERT INTO user_stats (user_id, xp) VALUES (?, ?)
                       ON CONFLICT(user_id) DO UPDATE SET xp = xp + excluded.xp`;

       db.run(query, [userId, xpToAdd], (xpErr) => {
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


// 🔴 Fortschritt pro Lektion ermitteln
router.get('/lesson/:id', authenticateToken, (req, res) => {
  const lessonId = req.params.id;
  const userId = req.user.id;

  const totalQuery = `SELECT COUNT(DISTINCT button_id) AS cnt FROM button_progress WHERE lesson_id = ?`;
  const doneQuery = `SELECT COUNT(*) AS cnt FROM button_progress WHERE lesson_id = ? AND user_id = ?`;

  db.get(totalQuery, [lessonId], (err, totalRow) => {
    if (err) return res.status(500).json({ message: 'Fehler beim Abrufen' });
    db.get(doneQuery, [lessonId, userId], (err2, doneRow) => {
      if (err2) return res.status(500).json({ message: 'Fehler beim Abrufen' });
      const total = totalRow?.cnt || 0;
      const done = doneRow?.cnt || 0;
      const percent = total ? Math.round((done / total) * 100) : 0;
      res.json({ percent });
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
// 🟢 Verstanden-Button speichern und XP vergeben
router.post('/button', authenticateToken, (req, res) => {
  const { buttonId, lessonId } = req.body;
  const userId = req.user.id;

   const insertSql = `INSERT INTO button_progress (user_id, button_id, lesson_id) VALUES (?, ?, ?)
                     ON CONFLICT(user_id, button_id) DO NOTHING`;
  const updateStatsSql = `INSERT INTO user_stats (user_id, xp) VALUES (?, ?)
                          ON CONFLICT(user_id) DO UPDATE SET xp = xp + ?`;

  db.run(insertSql, [userId, buttonId, lessonId], function (err) {
    if (err) {
      console.error('❌ Fehler beim Speichern des Buttons:', err.message);
      return res.status(500).json({ message: 'Fehler beim Speichern des Buttons' });
    }

    if (this.changes > 0) {
      const xp = 5; // per-button reward
      db.run(updateStatsSql, [userId, xp, xp], (statsErr) => {
        if (statsErr) {
          console.error('❌ Fehler beim Aktualisieren der Stats:', statsErr.message);
          return res.status(500).json({ message: 'Button gespeichert, XP aber nicht erhöht' });
        }
        res.json({ message: '✅ Button gespeichert', xpAwarded: xp });
      });
    } else {
      res.json({ message: 'Button bereits registriert', xpAwarded: 0 });
    }
  });
});

// 🟡 XP-Statistiken abrufen
router.get('/stats', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const xpPerLevel = 100;

  db.get('SELECT xp FROM user_stats WHERE user_id = ?', [userId], (err, row) => {
    if (err) {
      console.error('❌ Fehler beim Abrufen der Stats:', err.message);
      return res.status(500).json({ message: 'Fehler beim Abrufen der Stats' });
    }

    const xp = row ? row.xp : 0;
    const level = Math.floor(xp / xpPerLevel) + 1;
    const currentXp = xp % xpPerLevel;
    const progressPercent = (currentXp / xpPerLevel) * 100;

    res.json({ level, currentXp, progressPercent });
  });
});


module.exports = router;
