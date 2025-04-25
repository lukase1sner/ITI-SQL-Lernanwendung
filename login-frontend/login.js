document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const email = document.querySelector('input[placeholder="E-Mail-Adresse"]').value;
      const passwort = document.querySelector('input[placeholder="Passwort"]').value;
  
      const loginData = { email, passwort };
  
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      .then(response => {
        if (response.ok) {
          window.location.href = '../hauptprogramm/dashboard.html';  // Weiterleitung bei Erfolg
        } else {
          alert('Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.');
        }
      })
      .catch(error => {
        console.error('Fehler beim Login:', error);
      });
    });
  });
  