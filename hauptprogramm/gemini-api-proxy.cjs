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
Erstelle 5 sehr klare, eindeutige SQL-Anfänger-Aufgaben zum Thema "${topic}".

WICHTIG:
- Verwende in der Aufgabenstellung und der SQL-Lösung NUR die Spaltennamen, die es wirklich in der Tabelle gibt.
- Keine Aliasnamen, keine Umbenennung mit AS.
- Schreibe z.B. "Wähle die Spalte 'Name' aus der Tabelle 'Mitarbeiter' aus."
- Jede Aufgabe:
  - Beschreibung
  - passende Beispiel-Tabelle im Markdown-Format (max. 6 Spalten, 8 Zeilen)
  - korrekte, möglichst kurze SQL-Lösung (nur ein SQL-Befehl)

Antwortformat: JSON-Array wie
[
  {
    "frage": "...",
    "tabelle": "...",
    "loesung": "..."
  }
]

KEINE Einleitung, KEIN anderer Text!
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

// Eine ähnliche Aufgabe generieren
app.post("/api/gemini/aufgabeSimilar", async (req, res) => {
  const { frage, tabelle, loesung, topic } = req.body;
  const prompt = `
Erstelle eine neue, sehr ähnliche SQL-Aufgabe zum Thema "${topic}" für Anfänger.

Die neue Aufgabe soll:
- Aufbau und Schwierigkeitsgrad wie die folgende Aufgabe haben.
- Aber andere Werte in der Tabelle und ggf. eine andere Spalte/anderer Name etc.
- Verwende in der Aufgabenstellung und der SQL-Lösung NUR die Spaltennamen, die es wirklich in der Tabelle gibt.
- Keine Aliasnamen, keine Umbenennung mit AS.

Vorlage:
Frage: ${frage}
Tabelle:
${tabelle}
Lösung: ${loesung}

Neue Aufgabe im Format:
{
  "frage": "...",
  "tabelle": "...",
  "loesung": "..."
}

KEINE Einleitung, KEIN anderer Text, nur das JSON-Objekt!
  `.trim();

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    const text = response.data.candidates[0].content.parts[0].text;
    const match = text.match(/\{.*\}/s);
    if (!match) return res.status(500).json({ error: "Kein JSON erkannt" });

    let aufgabe = JSON.parse(match[0]);
    aufgabe.tabelle_html = markdownTableToHTML(aufgabe.tabelle);
    res.json(aufgabe);
  } catch (err) {
    console.error("Fehler bei ähnlicher Aufgabe:", err.message);
    res.status(500).json({ error: "Fehler bei ähnlicher Aufgabe" });
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
Danach eine schrittweise, verständliche Erklärung auf Deutsch, wie die Aufgabe richtig gelöst wird, in mehreren nummerierten Schritten.
KEINE Begrüßung, KEIN Smalltalk.
  `.trim();

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const text = response.data.candidates[0].content.parts[0].text;
    const korrekt = isSqlLoesungEquivalent(userAntwort, loesung);
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

// --- Hilfsfunktionen ---

function isSqlLoesungEquivalent(user, solution) {
  if (!user || !solution) return false;
  let normalize = s =>
    s
      .replace(/;/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  let a = normalize(user);
  let b = normalize(solution);
  if (a === b) return true;
  if (a.replace(/\s+/g, '') === b.replace(/\s+/g, '')) return true;

  // Hauptfall: SELECT <spalte> FROM <tabelle>
  let regex = /select\s+(.+)\s+from\s+([a-z0-9_]+)/i;
  let matchA = a.match(regex);
  let matchB = b.match(regex);
  if (matchA && matchB) {
    // Tabellennamen
    let tabA = matchA[2].trim();
    let tabB = matchB[2].trim();
    // Spaltennamen
    let colsA = matchA[1].split(',').map(x => x.trim());
    let colsB = matchB[1].split(',').map(x => x.trim());

    // Variante 1: Beide nutzen '*'
    if (colsA.length === 1 && colsA[0] === '*' && colsB.length === 1 && colsB[0] === '*' && tabA === tabB) {
      return true;
    }
    // Variante 2: Eine Seite '*' die andere alle Spalten (z.B. 'kundenid, name, stadt')
    if ((colsA.length === 1 && colsA[0] === '*' && tabA === tabB) ||
        (colsB.length === 1 && colsB[0] === '*' && tabA === tabB)) {
      return true;
    }
    // Variante 3: Beide listen alle Spalten – Reihenfolge egal
    if (
      tabA === tabB &&
      colsA.length === colsB.length &&
      colsA.every(col => colsB.includes(col))
    ) {
      return true;
    }
  }
  return false;
}

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
