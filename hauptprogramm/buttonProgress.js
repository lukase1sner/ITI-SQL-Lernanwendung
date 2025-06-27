let buttonSeq = 0;
function addVerstandenButton(container, lessonId) {
  buttonSeq += 1;
  const buttonId = 'b' + buttonSeq;
  const wrap = document.createElement('div');
  const btn = document.createElement('button');
  btn.textContent = 'Verstanden';
  btn.className = 'btn-verstanden';
  wrap.appendChild(btn);
  container.appendChild(wrap);

  const key = `progress_${lessonId}_${buttonId}`;
  if (localStorage.getItem(key)) btn.disabled = true;

  btn.addEventListener('click', async () => {
    if (btn.disabled) return;
    btn.disabled = true;
    localStorage.setItem(key, '1');
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
    } catch (e) {
      console.error('Fehler beim Senden des Fortschritts', e);
    }
  });
}