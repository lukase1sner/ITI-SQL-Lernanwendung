// hauptprogramm/gemini-api-proxy.cjs
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;

// Aufgaben generieren lassen (5 pro Thema)
app.get("/api/gemini/aufgaben", async (req, res) => {
  const topic = req.query.topic || "SELECT";
  const prompt = `
    Erstelle 5 verschiedene, verständliche SQL-Aufgaben zum Thema "${topic}" für Anfänger.
    Für jede Aufgabe:
    - Formuliere eine Aufgabenstellung (1 Satz). Nenne dabei den genauen Tabellennamen.
    - Gib eine passende Beispieltabelle (max. 6 Spalten, max. 8 Zeilen) im Markdown-Tabellenformat an.
    - Schreibe die korrekte SQL-Lösung (nur ein Query, keine Erklärung).
    Gib NUR ein JSON-Array wie dieses aus:
    [{"frage":"...","tabelle":"...","loesung":"..."}]
    Gib KEINE weiteren Kommentare oder Einleitung!
  `;
  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    // Extrahiere JSON aus LLM-Text
    let text = response.data.candidates[0].content.parts[0].text;
    let match = text.match(/\[.*\]/s);
    if (!match) return res.status(500).json({ error: "Kein Aufgaben-JSON erkannt!" });
    let aufgaben = JSON.parse(match[0]);
    // Jede Tabelle als HTML hinzufügen für's Frontend
    aufgaben = aufgaben.map(obj => ({
      ...obj,
      tabelle_html: markdownTableToHTML(obj.tabelle)
    }));
    res.json(aufgaben);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gemini-API Aufgaben-Fehler" });
  }
});

// Userantwort mit Gemini bewerten lassen
app.post("/api/gemini/verify", async (req, res) => {
  const { frage, tabelle, loesung, userAntwort, topic } = req.body;
  const prompt = `
    Aufgabe: ${frage}
    Tabelle: ${tabelle}
    Musterlösung: ${loesung}
    Nutzerantwort: ${userAntwort}
    Bewerte: Ist die Nutzerantwort korrekt? Antworte zuerst mit "Richtig" oder "Falsch".
    Erkläre die Lösung dann Schritt für Schritt auf Deutsch, auch wenn sie falsch ist.
    Gib KEINE weiteren Hinweise oder Begrüßungen!
  `;
  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    let text = response.data.candidates[0].content.parts[0].text;
    let korrekt = /richtig/i.test(text.split('\n')[0]);
    let ergebnis_html = null;
    if (korrekt && tabelle) {
      try {
        const tableObj = parseMarkdownTable(tabelle);
        ergebnis_html = filterRows(tableObj, userAntwort);
      } catch (err) {
        ergebnis_html = "<div>Ergebnis konnte nicht erstellt werden.</div>";
      }
    }
    res.json({ korrekt, feedback: text.replace(/\n/g, "<br>"), ergebnis_html });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Gemini-API Feedback-Fehler" });
  }
});

// --- Hilfsfunktionen für Tabellen & Mini-SQL ---
function parseMarkdownTable(md) {
  // Gibt ein Array von Objekten zurück
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
  // Unterstützt nur einfache SELECT ... FROM ... [WHERE ...]
  sql = sql.trim();
  let selectMatch = sql.match(/select (.+) from (\w+)(?: where (.+))?/i);
  if (!selectMatch) return '';
  let cols = selectMatch[1].split(',').map(c => c.trim());
  if (cols[0] === '*') cols = tableObj.header;
  let filter = selectMatch[3];

  let filteredRows = tableObj.rows;
  if (filter) {
    // Ganz einfacher WHERE-Parser: spalte op wert (nur ein Ausdruck)
    let whereMatch = filter.match(/(\w+)\s*([<>=]+)\s*['"]?([\w\s\däöüß]+)['"]?/i);
    if (whereMatch) {
      let [_, col, op, val] = whereMatch;
      col = col[0].toUpperCase() + col.slice(1); // Für unsere Tabellen meist uppercase-first
      filteredRows = filteredRows.filter(row => {
        let cell = row[col];
        let numCell = parseFloat(cell);
        let numVal = parseFloat(val);
        if (!isNaN(numCell) && !isNaN(numVal)) {
          switch (op) {
            case '=': return numCell == numVal;
            case '>': return numCell > numVal;
            case '<': return numCell < numVal;
            default: return false;
          }
        }
        // Fallback für Strings
        switch (op) {
          case '=': return cell == val;
          default: return false;
        }
      });
    }
  }
  // Ergebnis als HTML-Tabelle
  let html = '<table class="table table-dark table-bordered" style="background:#232540; color:#fff; border-radius:1rem; overflow:hidden;">';
  html += '<thead><tr>' + cols.map(c=>`<th>${c[0].toUpperCase()+c.slice(1)}</th>`).join('') + '</tr></thead>';
  html += '<tbody>';
  for (let row of filteredRows) {
    html += '<tr>' + cols.map(c=>`<td>${row[c[0].toUpperCase()+c.slice(1)] || ''}</td>`).join('') + '</tr>';
  }
  html += '</tbody></table>';
  return html;
}

function markdownTableToHTML(md) {
  if (!md) return '';
  const lines = md.trim().split('\n');
  if (lines.length < 2) return '';
  let html = '<table class="table table-dark table-bordered" style="background:#232540; color:#fff; border-radius:1rem; overflow:hidden;">';
  html += '<thead><tr>' + lines[0].split('|').filter(Boolean).map(c=>`<th>${c.trim()}</th>`).join('') + '</tr></thead>';
  html += '<tbody>';
  for (let i=2; i<lines.length; i++) {
    html += '<tr>' + lines[i].split('|').filter(Boolean).map(c=>`<td>${c.trim()}</td>`).join('') + '</tr>';
  }
  html += '</tbody></table>';
  return html;
}

const PORT = 4000;
app.listen(PORT, () => console.log("Gemini-API-Proxy läuft auf Port " + PORT));
