const express = require('express');
const jwt = require('jsonwebtoken');
const { saveProgress, getProgressByUser } = require('../models/progress');

const router = express.Router();
const JWT_SECRET = 'dein_geheimer_token_schlüssel'; // In Produktion via .env

// Middleware zur Token-Prüfung
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

// Fortschritt speichern
router.post('/', authenticateToken, (req, res) => {
  const { lessonId, percent } = req.body;
  const userId = req.user.id;

  saveProgress(userId, lessonId, percent, (err) => {
    if (err) return res.status(500).json({ message: 'Fehler beim Speichern' });
    res.status(200).json({ message: 'Fortschritt gespeichert' });
  });
});

// Fortschritt abrufen
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;

  getProgressByUser(userId, (err, data) => {
    if (err) return res.status(500).json({ message: 'Fehler beim Abrufen' });
    res.status(200).json(data);
  });
});

module.exports = router;
