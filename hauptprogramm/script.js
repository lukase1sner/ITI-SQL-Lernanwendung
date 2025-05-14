// Referenzen auf wichtige DOM-Elemente holen
const questionBox = document.getElementById('question-box');   // Anzeige der Quizfrage
const resultBox = document.getElementById('result-box');       // Anzeige der Bewertung
const userInput = document.getElementById('user-input');       // Texteingabefeld des Nutzers
const topicSelect = document.getElementById('topic-select');   // Dropdown-Menü für Themenwahl
const loadingIndicator = document.getElementById('loading-indicator'); // Ladeindikator

// Funktion zum Laden einer neuen Quizfrage basierend auf dem gewählten Thema
async function loadQuestion() {
  const topic = topicSelect.value; // aktuelles Thema aus dem Dropdown
  showLoading();                   // Ladeindikator anzeigen

  try {
    // Anfrage an das Backend zur Generierung einer neuen Frage
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Stelle mir eine kurze, verständliche Quizfrage zum Thema SQL: ${topic}.`,
        topic
      })
    });

    const data = await response.json(); // Antwort vom Server auslesen

    // Die Frage wird als Nachricht im Fragebereich angezeigt
    questionBox.innerHTML = `
      <div class="message tutor">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Tutor" class="avatar" />
        <div class="bubble blue">${data.reply}</div>
      </div>
    `;

    resultBox.innerHTML = ''; // vorheriges Ergebnis löschen
  } catch (error) {
    // Fehlerbehandlung bei Verbindungsproblemen o. Ä.
    questionBox.innerHTML = `<div class="bubble blue">❌ Fehler beim Laden der Frage.</div>`;
  }

  hideLoading(); // Ladeindikator ausblenden
}

// Klick-Event: Wenn der Nutzer seine Antwort sendet
document.getElementById('send-btn').addEventListener('click', async () => {
  const input = userInput.value.trim();           // Eingabe bereinigen (ohne Leerzeichen)
  const topic = topicSelect.value;                // aktuelles Thema
  const question = questionBox.textContent.trim(); // aktuelle Frage (nur Text)

  if (!input) return; // Wenn keine Eingabe vorhanden, nichts tun

  showLoading(); // Ladeindikator anzeigen

  try {
    // Anfrage an das Backend zur Bewertung der Nutzerantwort
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Hier ist die Frage: "${question}". Der Nutzer hat geantwortet: "${input}". Bewerte die Antwort kurz und klar.`,
        topic
      })
    });

    const data = await response.json(); // Bewertung vom Server abrufen

    // Bewertung im Ergebnisbereich anzeigen
    resultBox.innerHTML = `
      <div class="message tutor">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Tutor" class="avatar" />
        <div class="bubble blue">${data.reply}</div>
      </div>
    `;
  } catch (error) {
    // Fehlerbehandlung, falls Bewertung fehlschlägt
    resultBox.innerHTML = `<div class="bubble blue">❌ Fehler bei der Bewertung.</div>`;
  }

  userInput.value = ''; // Eingabefeld zurücksetzen
  hideLoading();        // Ladeindikator ausblenden
});

// Klick auf „Nächste Frage“ lädt eine neue Frage
document.getElementById('next-btn').addEventListener('click', loadQuestion);

// Wenn das Thema im Dropdown geändert wird, neue Frage laden
topicSelect.addEventListener('change', loadQuestion);

// Hilfsfunktionen zur Steuerung des Ladeindikators
function showLoading() {
  loadingIndicator.classList.remove('hidden'); // Ladeindikator einblenden
}

function hideLoading() {
  loadingIndicator.classList.add('hidden'); // Ladeindikator ausblenden
}

// Direkt beim Laden der Seite eine erste Frage abrufen
loadQuestion();
