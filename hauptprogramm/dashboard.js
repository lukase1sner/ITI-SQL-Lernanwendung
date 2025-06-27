async function ladeStatistiken() {
  try {
    const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:3001/api/progress/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Fehler beim Laden der Statistiken");

    const data = await res.json();

    // 🧠 Levelnamen (optional)
    const levelTitles = ["Newbie", "Apprentice", "Scholar", "Expert", "Master"];
    const title = levelTitles[Math.min(data.level, levelTitles.length - 1)];

    // 🧾 In HTML eintragen
    document.getElementById('level').textContent = `${data.level} – ${title}`;
    document.getElementById('xp-text').textContent = `${data.currentXp} / 100 XP`;
    document.getElementById('xp-progress').style.width = `${data.progressPercent}%`;
  document.getElementById('progress-label').textContent = `${data.progressPercent}%`;

  } catch (err) {
    console.error('❌ Fehler beim Laden der Statistiken:', err);
  }
  }

async function ladeLessonProgress() {
  const token = localStorage.getItem('token');
  const lessonIds = [1,2,3,4,5,6];
  for (const id of lessonIds) {
    try {
      const res = await fetch(`http://localhost:3001/api/progress/lesson/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) continue;
      const data = await res.json();
      document.querySelector(`.lesson-progress[data-lesson="${id}"]`).style.width = `${data.percent}%`;
      document.querySelector(`.lesson-percent[data-lesson="${id}"]`).textContent = `${data.percent}%`;
    } catch (e) {
      console.error('Fehler beim Laden des Fortschritts', e);
    }
  }
}

function setzeUsername() {
  const el = document.getElementById('username');
  if (!el) return;
  const firstName = localStorage.getItem('firstName');
    if (firstName) el.textContent = firstName;
}


// Automatisch beim Seitenladen
document.addEventListener('DOMContentLoaded', () => {
  setzeUsername();
  ladeStatistiken();
    ladeLessonProgress();
});
