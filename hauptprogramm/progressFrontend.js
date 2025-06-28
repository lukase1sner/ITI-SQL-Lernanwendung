// Basis-URL für API-Aufrufe ermitteln. Standardmäßig wird eine relative
// URL verwendet, sodass die Anfragen an denselben Host/Port gestellt werden.
const PROGRESS_API_BASE_URL =
  (typeof process !== 'undefined' && process.env && process.env.PROGRESS_API_BASE_URL) ||
  (typeof window !== 'undefined' && window.PROGRESS_API_BASE_URL) ||
  (typeof document !== 'undefined' && (
    document.currentScript?.dataset.apiBase ||
    document.querySelector('script[data-api-base]')?.dataset.apiBase
  )) ||
  '';

// Speichert den Fortschritt einer Lektion beim Server
async function saveProgress(lessonId, percent) {
  const token = localStorage.getItem('token');
  if (!token) return;

    const url = PROGRESS_API_BASE_URL
      ? `${PROGRESS_API_BASE_URL.replace(/\/$/, '')}/api/progress`
      : '/api/progress';


  try {
    await fetch(url, {
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