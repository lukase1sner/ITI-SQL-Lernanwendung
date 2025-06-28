let buttonSeq = 0;
const lessonState = {};
function addVerstandenButton(container, lessonId, subId) {
  buttonSeq += 1;
   const buttonId = subId ? `${lessonId}_${subId}` : 'b' + buttonSeq;
  const wrap = document.createElement('div');
  const btn = document.createElement('button');
  btn.textContent = 'Verstanden';
  btn.className = 'btn-verstanden';
  wrap.appendChild(btn);
  container.appendChild(wrap);

  if (!lessonState[lessonId]) {
    lessonState[lessonId] = { total: 0, done: 0 };
  }
  lessonState[lessonId].total += 1;

   const userId = localStorage.getItem('userId');
   const key = `progress_${userId}*${lessonId}*${buttonId}`;
   const oldKey = `progress_${lessonId}_${buttonId}`;

   if (!userId) {
     // clear outdated entries when no user id is present
     localStorage.removeItem(oldKey);
   } else if (localStorage.getItem(oldKey) && !localStorage.getItem(key)) {
     // migrate progress stored before user-specific keys
     localStorage.setItem(key, localStorage.getItem(oldKey));
     localStorage.removeItem(oldKey);
   }

  if (localStorage.getItem(key)) {
    btn.disabled = true;
    lessonState[lessonId].done += 1;
  }

  btn.addEventListener('click', async () => {
    if (btn.disabled) return;
    btn.disabled = true;
    localStorage.setItem(key, '1');
    lessonState[lessonId].done += 1;
    if (window.confetti) {
      window.confetti({ particleCount: 90, spread: 90, origin: { y: 0.75 } });
    }
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch('http://localhost:3001/api/progress/button', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
          body: JSON.stringify({ buttonId, lessonId })
      });
      if (typeof saveProgress === 'function') {
        const st = lessonState[lessonId];
        const percent = Math.round((st.done / st.total) * 100);
        saveProgress(lessonId, percent);
      }
    } catch (e) {
      console.error('Fehler beim Senden des Fortschritts', e);
    }
  });
}