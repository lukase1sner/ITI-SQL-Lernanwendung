// --------------------- Imports ---------------------

const express = require('express');          // Webserver-Framework
const cors = require('cors');                // Cross-Origin-Requests erlauben
const bodyParser = require('body-parser');   // JSON-Body auslesen
const path = require('path');                // Für spätere Dateioperationen (optional)

// 👉 Routenmodule einbinden
const registerRoute = require('./routes/register'); // Registrierung + user_stats


const app = express();       // Express-Instanz erstellen
const PORT = 3002;           // Port, auf dem der Server läuft

// --------------------- Middleware ---------------------

app.use(cors());             // Erlaubt Anfragen von Frontends (z. B. React auf Port 5173)
app.use(bodyParser.json());  // Parst JSON-Bodies → req.body verfügbar

// --------------------- API-Routen ---------------------

// Registrierung: POST /api/auth/register
app.use('/api/auth', registerRoute);

// Statistiken: GET /api/stats (z. B. für Dashboard)
// (Route entfernt)

// --------------------- Test-Endpunkt ---------------------

app.get('/', (req, res) => {
  res.send('✅ Signup-Backend läuft!');
});

// --------------------- Serverstart ---------------------

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
