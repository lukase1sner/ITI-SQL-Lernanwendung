// main2.js

// ===== Lektionen laden (ausgelagert in lessons2.js) =====
// Annahme: window.lessons2 ist im lessons2.js als Array definiert

// ===== Aufgaben laden (ausgelagert in aufgaben2.js) =====
// Annahme: window.aufgaben2 ist im aufgaben2.js als HTML-String definiert

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-buttons button");
  const lessonBox = document.getElementById("lessonContent");
  const exerciseBox = document.getElementById("exerciseContent");

  buttons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      if(idx === 5) {
        lessonBox.style.display = "none";
        exerciseBox.innerHTML = window.aufgaben2;
        exerciseBox.style.display = "block";
      } else {
        const lesson = window.lessons2[idx];
        lessonBox.innerHTML = `
          <h2>${lesson.title}</h2>
          <p>${lesson.description}</p>
          <ul>${lesson.list.map(item => `<li>${item}</li>`).join("")}</ul>
          <p><strong>Kurzes Video zum Einstieg:</strong></p>
          <iframe src="${lesson.video}" allowfullscreen></iframe>
        `;
        lessonBox.style.display = "block";
        exerciseBox.style.display = "none";
      }
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Standard: erste Lektion anzeigen
  buttons[0].click();
});

// ===== Quiz-Funktionen für die Aufgaben =====

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
