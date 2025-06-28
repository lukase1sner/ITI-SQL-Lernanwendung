
const LESSON_ID = 1;
const buttons = document.querySelectorAll(".tab-buttons button");
const lessonBox = document.getElementById("lessonContent");
const exerciseBox = document.getElementById("exerciseContent");


function renderLessonContent(lesson, container, sectionIdx) {
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

// RENDERT Challenge, wenn vorhanden:
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

// Initialisierung der ersten Lektion + Tab-Wechsel:
document.addEventListener("DOMContentLoaded", () => {
      renderLessonContent(window.lessons[0], lessonBox, 0);
    lessonBox.style.display = "block";
    exerciseBox.style.display = "none";
    buttons[0].classList.add("active");

    buttons.forEach((btn, idx) => {
        btn.addEventListener("click", function () {
            buttons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            if (idx === 6) {
                exerciseBox.style.display = "block";
                lessonBox.style.display = "none";
            } else {
               renderLessonContent(window.lessons[idx], lessonBox, idx);
                lessonBox.style.display = "block";
                exerciseBox.style.display = "none";
            }
        });
    });
});
