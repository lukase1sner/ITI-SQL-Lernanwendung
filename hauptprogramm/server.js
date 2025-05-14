// --------------------- Imports & Initialisierung ---------------------

// Express.js für Webserver-Funktionalität
import express from 'express';

// CORS erlaubt Cross-Origin-Requests (z. B. von Frontend auf anderem Port)
import cors from 'cors';

// Body-Parser liest JSON-Daten aus HTTP-POST-Anfragen
import bodyParser from 'body-parser';

// node-fetch zum Durchführen von HTTP-Anfragen (hier: OpenAI API)
import fetch from 'node-fetch';

// dotenv lädt Umgebungsvariablen aus einer .env-Datei
import dotenv from 'dotenv';

// path & fileURLToPath für Dateipfade (z. B. dashboard.html finden)
import path from 'path';
import { fileURLToPath } from 'url';

// .env-Datei laden (z. B. OPENAI_API_KEY)
dotenv.config();

// Express-App erzeugen
const app = express();
const PORT = 3003;

// __dirname in ES Modules (da 'require' nicht verfügbar ist)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------- Middleware ---------------------

// Erlaubt Anfragen aus anderen Quellen (Frontend-Host, z. B. localhost:3000)
app.use(cors());

// Wandelt eingehende JSON-Daten automatisch in JS-Objekte um
app.use(bodyParser.json());

// --------------------- Routing ---------------------

// Startseite (Dashboard-HTML) bei GET-Anfrage auf Root-URL ausliefern
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Dient der Auslieferung statischer Dateien (HTML, CSS, JS)
app.use(express.static(__dirname));

// --------------------- OpenAI GPT-4o API Route ---------------------

// API-Key aus Umgebungsvariablen
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// POST-Anfrage: User sendet eine Nachricht, GPT generiert eine Antwort
app.post('/api/gpt', async (req, res) => {
  const { message, topic } = req.body;

  // Nachricht verwenden, wenn vorhanden, sonst Standard-Text
  const prompt = message || `Bitte stelle mir eine Quizfrage zu SQL: ${topic}`;

  try {
    // Anfrage an OpenAI-API senden
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Modell „gpt-4o“ verwenden
        messages: [
          { role: 'system', content: 'Du bist ein SQL-Tutor.' },     // Systemrolle: definiert Verhalten
          { role: 'user', content: prompt }                           // Nutzereingabe
        ]
      })
    });

    const data = await response.json(); // Antwort von OpenAI lesen

    // GPT-Antwort extrahieren (falls vorhanden)
    const reply = data?.choices?.[0]?.message?.content?.trim();

    // Antwort an Client zurücksenden
    res.json({ reply: reply || '⚠️ Keine Antwort erhalten.' });

  } catch (error) {
    // Bei Fehlern: Log und Fehlermeldung senden
    console.error(error);
    res.status(500).json({ reply: '❌ Fehler bei der Anfrage an OpenAI.' });
  }
});

// --------------------- Server starten ---------------------

// Server hört auf definierter Portnummer
app.listen(PORT, () => {
  console.log(`✅ Server läuft unter http://localhost:${PORT}`);
});
