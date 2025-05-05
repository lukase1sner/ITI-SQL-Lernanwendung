import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3003;

// __dirname für ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

// Dashboard als Startseite ausliefern
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 👉 Statische Dateien direkt aus dem aktuellen Ordner (z. B. index.html, style.css)
app.use(express.static(__dirname));

// OpenAI-API-Route
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/gpt', async (req, res) => {
  const { message, topic } = req.body;
  const prompt = message || `...`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Du bist ein SQL-Tutor.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    res.json({ reply: reply || '⚠️ Keine Antwort erhalten.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: '❌ Fehler bei der Anfrage an OpenAI.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft unter http://localhost:${PORT}`);
});
