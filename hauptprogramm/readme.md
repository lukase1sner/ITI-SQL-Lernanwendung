SQLMate – ITI-SQL-Lernanwendung

SQLMate ist ein praxisnahes Lernprojekt, das die Grundlagen von SQL durch spielerische, interaktive Lektionen vermittelt. Die Anwendung setzt sich aus mehreren Node.js-Servern und modularen Frontend-Seiten für Registrierung, Login und das eigentliche Lernen zusammen. Optional kann ein KI-Chatbot (Gemini) zur Aufgabenunterstützung genutzt werden.
Inhalt
Schnellstart
Projektstruktur
Funktionsübersicht
Server & Ports
API-Überblick
Datenbankstruktur
Entwicklung & Erweiterung
Sicherheit & Hinweise
Kontakt & Mitmachen
Schnellstart
Voraussetzungen:
Node.js (empfohlen ab Version 18)
Git
Optional: Gemini-API-Key für Chatbot-Funktion
Installation & Start:
Repository klonen:
git clone <repo>
cd ITI-SQL-Lernanwendung
Abhängigkeiten installieren:
cd loginBackend && npm install
cd ../signupBackend && npm install
cd ../hauptprogramm && npm install
(Optional) Gemini-API-Key in .env hinterlegen:
# im Ordner hauptprogramm/.env anlegen
GEMINI_API_KEY=<dein_api_key>
Server jeweils in separaten Terminals starten:
node loginBackend/server.js             # Login & Fortschritt (Port 3001)
node signupBackend/server.js            # Registrierung & Statistiken (Port 3002)
node hauptprogramm/gemini-api-proxy.cjs # Gemini-Proxy (Port 4000)
node hauptprogramm/server.js            # Lernplattform/Frontend (Port 3003)
Lernoberfläche im Browser öffnen:
http://localhost:3003/index.html
Projektstruktur
├── hauptprogramm/           # Frontend (HTML/CSS/JS), Dashboard, Lektionen, Gemini-Proxy
│   ├── lektion1.html        # Einzelne Lektionen als HTML
│   └── ...
├── loginBackend/            # Express-API: Login & Fortschritt
├── signupBackend/           # Express-API: Registrierung & User-Stats
├── loginFrontend/           # Minimaler Login-Screen
├── signupFrontend/          # Minimaler Registrierungs-Screen
├── resetpassword-frontend/  # Passwort-Reset-Seite (optional)
└── index.html               # Einstieg/Landingpage
Jede Lektion liegt als eigene HTML-Datei unter hauptprogramm/.
Nach Login erfolgt der Start auf dashboard.html.
Funktionsübersicht
Interaktive Lektionen: SQL-Aufgaben mit Feedback in mehreren Schwierigkeitsstufen
Gamification: XP- und Levelsystem zur Lernmotivation (aus user_stats)
Fortschrittsanzeige: Prozentuale Anzeige pro Lektion, "Verstanden"-Button für XP
Registrierung & Login: Benutzerverwaltung, Passwort-Hashing (bcryptjs), JWT-Authentifizierung
Gemini-Chatbot (optional): Beantwortet SQL-Fragen, bewertet Aufgaben und generiert Übungen
Progress Tracking: Fortschritt und XP werden pro Benutzer gespeichert
Server & Ports
Server	Funktion	Port
loginBackend/server.js	Login-API & Fortschritt speichern	3001
signupBackend/server.js	Registrierung & Benutzerstatistiken	3002
hauptprogramm/server.js	Statischer Datei-Server (Frontend)	3003
hauptprogramm/gemini-api-proxy.cjs	Proxy zu Gemini-API (KI-Chatbot)	4000
Hinweis:
Jeder Server läuft unabhängig auf einem eigenen Port und greift auf eine zentrale SQLite-Datenbank zu. Die Tabellen werden beim ersten Start automatisch erzeugt.
API-Überblick
Authentifizierung & Fortschritt (loginBackend)
Route	Methode	Beschreibung	Auth
/api/auth/register	POST	Benutzer registrieren	–
/api/auth/login	POST	Login, gibt JWT zurück	–
/api/progress	POST	Fortschritt speichern	JWT
/api/progress	GET	Fortschritt aller Lektionen abrufen	JWT
/api/progress/lesson/:id	GET	Fortschritt einer Lektion abfragen	JWT
/api/progress/button	POST	„Verstanden“-Klick speichern, XP vergeben	JWT
/api/progress/stats	GET	XP-Statistiken und Level anzeigen	JWT
Registrierung (signupBackend)
Route	Methode	Beschreibung
/api/auth/register	POST	Registrierung (Alternative)
Gemini-Proxy (hauptprogramm)
Route	Methode	Beschreibung
/api/gemini/aufgaben	GET	Beispielaufgaben generieren
/api/gemini/aufgabeSimilar	POST	Ähnliche Aufgabe erzeugen
/api/gemini/verify	POST	Nutzerantwort bewerten
Beispiel für Authentifizierung:
Bei allen geschützten Routen ist ein gültiges JWT im Header erforderlich:
Authorization: Bearer <JWT>
Weitere Details siehe Quellcode (z.B. auth.js, progress.js, gemini-api-proxy.cjs).
Datenbankstruktur
Dateiname: database.sqlite
Tabellen:
users – Benutzerkonten (Vorname, E-Mail, Passwort-Hash)
progress – Fortschritt pro Lektion & Nutzer
button_progress – "Verstanden"-Klicks pro Lektion (XP-Vergabe)
user_stats – XP, Level, Lernzeit pro Nutzer
Die Datenbank wird automatisch beim Start eines Backends angelegt und erweitert.
Entwicklung & Erweiterung
Eigene Lektionen: Neue Lektionen als lektionX.html in hauptprogramm/ anlegen
APIs: Zusätzliche API-Routen lassen sich unkompliziert in den jeweiligen Backends hinzufügen (Express.js)
Chatbot: Gemini-API kann individuell erweitert werden (eigene Prompts/Funktionen)
Styling: Frontend nutzt Bootstrap, kann einfach angepasst werden
Sicherheit & Hinweise
Passwort-Sicherheit: Passwörter werden mit bcryptjs gehasht
JWT: Authentifizierung aller kritischen API-Endpunkte über JWT
Nur lokale Speicherung: Alle Daten werden lokal in SQLite gespeichert (keine Cloud)
Lernprojekt: Nicht für produktiven Einsatz konzipiert – für reale Nutzung bitte weitere Sicherheitsmaßnahmen (HTTPS, Umgebungsvariablen, Fehlerbehandlung etc.) beachten
Open Source: Quellcode ist offen für eigene Anpassungen
Kontakt & Mitmachen
Fragen, Feedback und Pull Requests sind willkommen!
Für größere Anpassungen gerne ein Issue erstellen.
Viel Erfolg beim Lernen mit SQLMate!