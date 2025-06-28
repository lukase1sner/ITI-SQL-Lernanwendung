// main2.js

// Annahme: window.lessons2 und window.aufgaben2 sind bereits im Projekt definiert!

// === Challenge-Funktion (wie in main.js, übernimmt das Rendering der Quizfragen) ===
const LESSON_ID = 2;

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
function renderLessonContent2(lesson, container, sectionIdx) {
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
           addVerstandenButton(container, LESSON_ID, sectionIdx);
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
                renderLessonContent2(lesson, lessonBox, idx);
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
    const inputs = document.querySelectorAll('input[name="q1"]');
    const feedback = document.getElementById('feedbackQ1');
    const labels = Array.from(inputs).map(i => i.closest('label'));
    labels.forEach(l => l.classList.remove('correct', 'incorrect'));
  let correct = false;

  inputs.forEach(inp => {
    if (inp.checked) {
      correct = !!inp.dataset.solution;
      inp.closest('label').classList.add(correct ? 'correct' : 'incorrect');
    }
    inp.disabled = true;
  });

  feedback.textContent = correct ? '✅ Richtig!' : '❌ Leider falsch.';
  if (correct && window.confetti) window.confetti();
}

function checkQ2() {
   const inputs = document.querySelectorAll('input[name="q2"]');
   const feedback = document.getElementById('feedbackQ2');
   const labels = Array.from(inputs).map(i => i.closest('label'));
   labels.forEach(l => l.classList.remove('correct', 'incorrect'));

   let allCorrect = true;
   inputs.forEach(inp => {
     if (inp.dataset.solution) {
       if (!inp.checked) allCorrect = false;
     } else {
       if (inp.checked) allCorrect = false;
     }
   });

   inputs.forEach(inp => {
     const label = inp.closest('label');
     if (inp.checked) {
       label.classList.add(inp.dataset.solution ? 'correct' : 'incorrect');
     } else if (allCorrect && inp.dataset.solution) {
       label.classList.add('correct');
     }
     inp.disabled = true;
   });

   feedback.textContent = allCorrect ? '✅ Richtig!' : '❌ Leider falsch.';
   if (allCorrect && window.confetti) window.confetti();
}

function checkQ3() {
   const input = document.getElementById('q3input');
    const feedback = document.getElementById('feedbackQ3');
    const val = input.value.trim().toLowerCase();
    const correct = val === 'tupel';
    input.disabled = true;
    feedback.textContent = correct ? '✅ Richtig!' : '❌ Leider falsch. (Richtig: Tupel)';
    if (correct && window.confetti) window.confetti();
}

function checkQ4() {
 const inputs = document.querySelectorAll('input[name="q4"]');
  const feedback = document.getElementById('feedbackQ4');
  const labels = Array.from(inputs).map(i => i.closest('label'));
  labels.forEach(l => l.classList.remove('correct', 'incorrect'));
  let correct = false;


  inputs.forEach(inp => {
    if (inp.checked) {
      correct = !!inp.dataset.solution;
      inp.closest('label').classList.add(correct ? 'correct' : 'incorrect');
    }
    inp.disabled = true;
  });

  feedback.textContent = correct ? '✅ Richtig!' : '❌ Leider falsch.';
  if (correct && window.confetti) window.confetti();
}

function checkQ5() {
  const inputs = document.querySelectorAll('input[name="q5"]');
   const feedback = document.getElementById('feedbackQ5');
   const labels = Array.from(inputs).map(i => i.closest('label'));
   labels.forEach(l => l.classList.remove('correct', 'incorrect'));
  let correct = false;

  inputs.forEach(inp => {
    if (inp.checked) {
      correct = !!inp.dataset.solution;
      inp.closest('label').classList.add(correct ? 'correct' : 'incorrect');
    }
    inp.disabled = true;
  });

  feedback.textContent = correct ? '✅ Richtig!' : '❌ Leider falsch.';
  if (correct && window.confetti) window.confetti();
}
