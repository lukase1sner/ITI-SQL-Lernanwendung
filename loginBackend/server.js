// --------------------- Imports ---------------------

const express = require('express');              // Express-Framework für Server und Routing
const cors = require('cors');                    // CORS-Middleware erlaubt Cross-Origin-Anfragen
const authRoutes = require('./routes/auth');     // Routen für Authentifizierung (Login/Registrierung)
const progressRoutes = require('./routes/progress'); // Routen für Lernfortschritt & Stats


// --------------------- Server-Setup ---------------------

const app = express(); // Neue Express-Anwendung erstellen
const PORT = 3001;     // Lokaler Port, auf dem der Server laufen soll

// --------------------- Middleware ---------------------

app.use(cors());              // Erlaubt Anfragen von anderen Domains (z. B. Frontend auf Port 5173)
app.use(express.json());      // Automatische Verarbeitung von JSON-Request-Bodys

// --------------------- API-Routen ---------------------

// Authentifizierung: z. B. POST /api/auth/login oder /api/auth/register
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);


// --------------------- Serverstart ---------------------

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
