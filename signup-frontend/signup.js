document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const vorname = document.querySelector('input[placeholder="Vorname"]').value;
    const nachname = document.querySelector('input[placeholder="Nachname"]').value;
    const email = document.querySelector('input[placeholder="E-Mail-Adresse"]').value;
    const passwort = document.querySelector('input[placeholder="Passwort"]').value;

    const userData = { vorname, nachname, email, passwort };

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        // ✅ Weiterleitung zur Bestätigungsseite
        window.location.href = 'signup-success.html';
      } else {
        return response.text().then(text => { throw new Error(text); });
      }
    })
    .catch(error => {
      console.error('Fehler:', error);
      alert('Fehler bei der Registrierung: ' + error.message);
    });
  });
});
