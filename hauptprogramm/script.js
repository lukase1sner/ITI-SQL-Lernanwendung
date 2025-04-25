const questionBox = document.getElementById('question-box');
const resultBox = document.getElementById('result-box');
const userInput = document.getElementById('user-input');
const topicSelect = document.getElementById('topic-select');
const loadingIndicator = document.getElementById('loading-indicator');

async function loadQuestion() {
  const topic = topicSelect.value;
  showLoading();

  try {
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Stelle mir eine kurze, verständliche Quizfrage zum Thema SQL: ${topic}.`,
        topic
      })
    });

    const data = await response.json();
    questionBox.innerHTML = `
      <div class="message tutor">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Tutor" class="avatar" />
        <div class="bubble blue">${data.reply}</div>
      </div>
    `;
    resultBox.innerHTML = '';
  } catch (error) {
    questionBox.innerHTML = `<div class="bubble blue">❌ Fehler beim Laden der Frage.</div>`;
  }

  hideLoading();
}

document.getElementById('send-btn').addEventListener('click', async () => {
  const input = userInput.value.trim();
  const topic = topicSelect.value;
  const question = questionBox.textContent.trim();
  if (!input) return;

  showLoading();

  try {
    const response = await fetch('/api/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Hier ist die Frage: "${question}". Der Nutzer hat geantwortet: "${input}". Bewerte die Antwort kurz und klar.`,
        topic
      })
    });

    const data = await response.json();
    resultBox.innerHTML = `
      <div class="message tutor">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Tutor" class="avatar" />
        <div class="bubble blue">${data.reply}</div>
      </div>
    `;
  } catch (error) {
    resultBox.innerHTML = `<div class="bubble blue">❌ Fehler bei der Bewertung.</div>`;
  }

  userInput.value = '';
  hideLoading();
});

document.getElementById('next-btn').addEventListener('click', loadQuestion);

topicSelect.addEventListener('change', loadQuestion);

function showLoading() {
  loadingIndicator.classList.remove('hidden');
}

function hideLoading() {
  loadingIndicator.classList.add('hidden');
}

// Direkt beim Laden erste Frage holen
loadQuestion();
