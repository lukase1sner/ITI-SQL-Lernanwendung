// --------------------- Imports & Setup ---------------------
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = 3003;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------- Middleware ---------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// --------------------- DB-Verbindung aufbauen ---------------------
let db;
const initDB = async () => {
  db = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });

  console.log('✅ Mit SQLite-Datenbank verbunden.');

  // Tabellen erstellen (falls nicht vorhanden)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      lesson_id INTEGER,
      percent INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
};

// --------------------- Routen ---------------------

// Startseite (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Registrierung
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    res.json({ message: 'Registrierung erfolgreich', userId: result.lastID });
  } catch (err) {
    console.error('❌ Fehler bei Registrierung:', err);
    res.status(500).json({ error: 'Registrierung fehlgeschlagen' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Benutzer nicht gefunden' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Falsches Passwort' });
    }
    res.json({ message: 'Login erfolgreich', userId: user.id });
  } catch (err) {
    console.error('❌ Fehler beim Login:', err);
    res.status(500).json({ error: 'Login fehlgeschlagen' });
  }
});

// Fortschritt abrufen
app.get('/api/progress', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM progress');
    res.json(rows);
  } catch (err) {
    console.error('❌ Fehler beim Laden des Fortschritts:', err);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// --------------------- Server starten ---------------------
const startServer = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`✅ Server läuft unter http://localhost:${PORT}`);
  });
};

startServer();
