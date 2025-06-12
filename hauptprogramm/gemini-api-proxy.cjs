require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;

// Aufgaben generieren
app.get("/api/gemini/aufgaben", async (req, res) => {
  const topic = req.query.topic || "SELECT";
  const prompt = `
Erstelle 5 einfache SQL-Aufgaben zum Thema "${topic}" für Anfänger.

Jede Aufgabe soll enthalten:
- Eine klare Aufgabenbeschreibung (ein Satz)
- Eine passende Tabelle im Markdown-Format (max. 6 Spalten, 8 Zeilen)
- Eine korrekte SQL-Lösung (nur ein SQL-Befehl)

Antwortformat: JSON-Array wie
[
  {
    "frage": "...",
    "tabelle": "...",
    "loesung": "..."
  }
]

Keine Einleitung, nur JSON!
  `.trim();

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const text = response.data.candidates[0].content.parts[0].text;
    const match = text.match(/\[.*\]/s);
    if (!match) return res.status(500).json({ error: "Kein JSON erkannt" });

    let aufgaben = JSON.parse(match[0]);
    aufgaben = aufgaben.map(obj => ({
      ...obj,
      tabelle_html: markdownTableToHTML(obj.tabelle)
    }));

    res.json(aufgaben);
  } catch (err) {
    console.error("Fehler beim Laden von Aufgaben:", err.message);
    res.status(500).json({ error: "Fehler bei der Aufgabenabfrage" });
  }
});

// Antwort bewerten
app.post("/api/gemini/verify", async (req, res) => {
  const { frage, tabelle, loesung, userAntwort } = req.body;

  const prompt = `
Aufgabe: ${frage}
Tabelle: ${tabelle}
Musterlösung: ${loesung}
Nutzerantwort: ${userAntwort}

Beurteile die Antwort: Gib "Richtig" oder "Falsch" zuerst.
Danach eine schrittweise Erklärung auf Deutsch.
Keine Begrüßung, kein Smalltalk.
  `.trim();

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const text = response.data.candidates[0].content.parts[0].text;
    const korrekt = /^richtig/i.test(text.trim());

    let ergebnis_html = null;
    if (korrekt && tabelle) {
      try {
        const tableObj = parseMarkdownTable(tabelle);
        ergebnis_html = filterRows(tableObj, userAntwort);
      } catch (e) {
        ergebnis_html = "<div>Ergebnis konnte nicht erstellt werden.</div>";
      }
    }

    res.json({ korrekt, feedback: text.replace(/\n/g, "<br>"), ergebnis_html });

  } catch (err) {
    console.error("Fehler bei verify:", err.message);
    res.status(500).json({ error: "Verifikation fehlgeschlagen" });
  }
});

// Tipps generieren
app.post("/api/gemini/tipps", async (req, res) => {
  const { frage, loesung, userAntwort, tabelle } = req.body;

  const prompt = `
Der Nutzer hat eine SQL-Aufgabe falsch beantwortet. Du bist ein Tutor.

Deine Aufgabe:
- Analysiere den Fehler in der Antwort
- Gib mehrere aufeinander aufbauende Tipps
- Tipps sollen SQL-Syntax, Verständnis, Struktur, Logik erklären
- Nutze alle verfügbaren Informationen
- Formuliere in gutem, einfachem Deutsch

Aufgabe:
${frage}

Tabelle:
${tabelle}

Musterlösung:
${loesung}

Falsche Nutzerantwort:
${userAntwort}

Format: JSON-Array wie
[
  "Tipp 1...",
  "Tipp 2...",
  ...
]

Kein anderer Text. Nur JSON-Array!
  `.trim();

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const text = response.data.candidates[0].content.parts[0].text;
    const match = text.match(/\[.*\]/s);

    let tipps = [];
    if (match) {
      try {
        tipps = JSON.parse(match[0]);
      } catch (err) {
        console.warn("⚠️ Tipp-JSON Fehler:", err.message);
      }
    }

    if (!Array.isArray(tipps) || tipps.length === 0) {
      return res.status(500).json({ error: "Keine Tipps generiert." });
    }

    res.json({ tipps });

  } catch (err) {
    console.error("❌ Tippfehler:", err.message);
    res.status(500).json({ error: "Gemini-Tippanfrage fehlgeschlagen." });
  }
});

// --- Hilfsfunktionen ---
function parseMarkdownTable(md) {
  if (!md) return { header: [], rows: [] };
  const lines = md.trim().split('\n').filter(l => l.trim());
  const header = lines[0].split('|').map(x => x.trim()).filter(Boolean);
  const rows = [];
  for (let i = 2; i < lines.length; i++) {
    const values = lines[i].split('|').map(x => x.trim()).filter(Boolean);
    const obj = {};
    header.forEach((key, idx) => { obj[key] = values[idx]; });
    rows.push(obj);
  }
  return { header, rows };
}

function filterRows(tableObj, sql) {
  sql = sql.trim();
  let selectMatch = sql.match(/select (.+) from (\w+)(?: where (.+))?/i);
  if (!selectMatch) return '';
  let cols = selectMatch[1].split(',').map(c => c.trim());
  if (cols[0] === '*') cols = tableObj.header;
  let filter = selectMatch[3];

  let filteredRows = tableObj.rows;
  if (filter) {
    let whereMatch = filter.match(/(\w+)\s*([<>=]+)\s*['"]?([\w\s\däöüß]+)['"]?/i);
    if (whereMatch) {
      let [_, col, op, val] = whereMatch;
      filteredRows = filteredRows.filter(row => {
        const rowKeys = Object.keys(row);
        const realKey = rowKeys.find(k => k.toLowerCase() === col.toLowerCase());
        if (!realKey) return false;
        let cell = row[realKey];
        let numCell = parseFloat(cell);
        let numVal = parseFloat(val);
        if (!isNaN(numCell) && !isNaN(numVal)) {
          switch (op) {
            case '=': return numCell == numVal;
            case '>': return numCell > numVal;
            case '<': return numCell < numVal;
          }
        }
        return op === '=' && cell === val;
      });
    }
  }

  let html = '<table class="table table-dark table-bordered" style="background:#232540; color:#fff; border-radius:1rem; overflow:hidden;">';
  html += '<thead><tr>' + cols.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
  filteredRows.forEach(row => {
    html += '<tr>' + cols.map(c => {
      const realKey = Object.keys(row).find(k => k.toLowerCase() === c.toLowerCase());
      return `<td>${realKey ? row[realKey] : ''}</td>`;
    }).join('') + '</tr>';
  });
  html += '</tbody></table>';
  return html;
}

function markdownTableToHTML(md) {
  if (!md) return '';
  const lines = md.trim().split('\n');
  if (lines.length < 2) return '';
  let html = '<table class="table table-dark table-bordered" style="background:#232540; color:#fff; border-radius:1rem; overflow:hidden;">';
  html += '<thead><tr>' + lines[0].split('|').filter(Boolean).map(c => `<th>${c.trim()}</th>`).join('') + '</tr></thead><tbody>';
  for (let i = 2; i < lines.length; i++) {
    html += '<tr>' + lines[i].split('|').filter(Boolean).map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
  }
  html += '</tbody></table>';
  return html;
}

const PORT = 4000;
app.listen(PORT, () => console.log("✅ Gemini-API läuft auf http://localhost:" + PORT));
