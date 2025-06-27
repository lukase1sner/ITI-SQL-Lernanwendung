// Speichert den Fortschritt einer Lektion beim Server
async function saveProgress(lessonId, percent) {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    await fetch('http://localhost:3001/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ lessonId, percent })
    });
  } catch (e) {
    console.error('Fehler beim Speichern des Fortschritts', e);
  }
}