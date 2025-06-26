// main2.js

// Annahme: window.lessons2 und window.aufgaben2 sind bereits im Projekt definiert!

// === Challenge-Funktion (wie in main.js, übernimmt das Rendering der Quizfragen) ===
function renderChallengeNew(lesson, containerId) {
    if (!lesson.challenge) return;
    const c = lesson.challenge;
    const challengeDiv = document.getElementById(containerId);
    challengeDiv.innerHTML = `<p><strong>Challenge:</strong> ${c.question}</p>`;

    c.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.className = "exercise-btn";
        btn.style.margin = "0.2em";
        btn.onclick = function () {
            if (i === c.solution) {
                btn.style.background = "#2e7d32";
                btn.style.color = "#fff";
                feedback.textContent = "✅ Richtig!";
                window.confetti && window.confetti();
            } else {
                btn.style.background = "#c62828";
                btn.style.color = "#fff";
                feedback.textContent = "❌ Leider falsch.";
            }
            Array.from(challengeDiv.querySelectorAll("button")).forEach(b => b.disabled = true);
        };
        challengeDiv.appendChild(btn);
    });

    const feedback = document.createElement("div");
    feedback.style.marginTop = "1em";
    challengeDiv.appendChild(feedback);
}

// === Lektion-Rendering inklusive Challenge ===
function renderLessonContent2(lesson, container) {
    container.innerHTML = `
        <h2>${lesson.title}</h2>
        <p>${lesson.description.replace(/\n/g, '<br>')}</p>
        <ul>
            ${lesson.list.map(item => `<li>${item}</li>`).join("")}
        </ul>
        ${lesson.video ? `<iframe src="${lesson.video}" allowfullscreen></iframe>` : ""}
        <div id="challengeBox"></div>
    `;
    renderChallengeNew(lesson, "challengeBox");
}

// === Initialisierung & Tabwechsel ===
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-buttons button");
    const lessonBox = document.getElementById("lessonContent");
    const exerciseBox = document.getElementById("exerciseContent");

    buttons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            if(idx === 5) { // Aufgaben-Tab
                lessonBox.style.display = "none";
                exerciseBox.innerHTML = window.aufgaben2;
                exerciseBox.style.display = "block";
            } else {
                const lesson = window.lessons2[idx];
                renderLessonContent2(lesson, lessonBox);
                lessonBox.style.display = "block";
                exerciseBox.style.display = "none";
            }
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Beim Laden direkt die erste Lektion anzeigen
    buttons[0].click();
});

// === Eigene Quiz-Funktionen für aufgaben2.html (optional, je nach Aufbau der Aufgaben) ===
// Beispiel: (Belass es so, falls du eigene Aufgaben-HTML weiter benutzt.)
function checkQ1() {
  const q = document.querySelectorAll('input[name="q1"]');
  let correct = false;
  q.forEach(r => { if(r.checked && r.dataset.solution) correct = true; });
  document.getElementById('feedbackQ1').textContent = correct ? "✅ Richtig!" : "❌ Leider falsch.";
}
function checkQ2() {
  const q = document.querySelectorAll('input[name="q2"]');
  let correct = q[0].checked && !q[1].checked && q[2].checked && !q[3].checked;
  document.getElementById('feedbackQ2').textContent = correct ? "✅ Richtig!" : "❌ Leider falsch.";
}
function checkQ3() {
  const val = document.getElementById('q3input').value.trim().toLowerCase();
  document.getElementById('feedbackQ3').textContent =
    (val === "tupel") ? "✅ Richtig!" : "❌ Leider falsch. (Richtig: Tupel)";
}
function checkQ4() {
  const q = document.querySelectorAll('input[name="q4"]');
  let correct = false;
  q.forEach(r => { if(r.checked && r.dataset.solution) correct = true; });
  document.getElementById('feedbackQ4').textContent = correct ? "✅ Richtig!" : "❌ Leider falsch.";
}
function checkQ5() {
  const q = document.querySelectorAll('input[name="q5"]');
  let correct = false;
  q.forEach(r => { if(r.checked && r.dataset.solution) correct = true; });
  document.getElementById('feedbackQ5').textContent = correct ? "✅ Richtig!" : "❌ Leider falsch.";
}
