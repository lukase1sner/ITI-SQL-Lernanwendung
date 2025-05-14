async function ladeStatistiken() {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:3001/api/stats', {
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

// Automatisch beim Seitenladen
document.addEventListener('DOMContentLoaded', ladeStatistiken);
