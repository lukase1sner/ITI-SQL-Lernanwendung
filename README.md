SQLMate – ITI-SQL-Lernanwendung

SQLMate ist ein Lernprojekt, das Einsteigern die Grundlagen von SQL durch interaktive Lektionen vermittelt. Es nutzt mehrere Node.js-Server und ein modulares Frontend für Registrierung, Login und Lerninhalte. Optional unterstützt ein Gemini-Chatbot beim Lösen von Aufgaben.
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
Voraussetzungen
Node.js (ab Version 18 empfohlen)
Git
Optional: Gemini‑API‑Key für den Chatbot
Installation
# Repository klonen
git clone <repo>
cd ITI-SQL-Lernanwendung

# Abhängigkeiten installieren
cd loginBackend && npm install
cd ../signupBackend && npm install
cd ../hauptprogramm && npm install
Optional kann im Ordner hauptprogramm/ eine .env mit dem Schlüssel für Gemini angelegt werden:
GEMINI_API_KEY=<dein_api_key>
Server starten
Jeder Server läuft separat (am besten in eigenen Terminals):
node loginBackend/server.js             # Login & Fortschritt (Port 3001)
node signupBackend/server.js            # Registrierung & Statistiken (Port 3002)
node hauptprogramm/gemini-api-proxy.cjs # Gemini-Proxy (Port 4000)
node hauptprogramm/server.js            # Lernplattform/Frontend (Port 3003)
Danach ist die Lernoberfläche unter http://localhost:3003/index.html erreichbar.
Projektstruktur
hauptprogramm/            Frontend (HTML/CSS/JS) und Gemini-Proxy
├── lektion1.html         Einzelne Lektionen
├── ...
loginBackend/             Express-API für Login & Fortschritt
signupBackend/            Express-API für Registrierung & Statistiken
loginFrontend/            Einfacher Login-Screen
signupFrontend/           Einfacher Registrierungs-Screen
resetpassword-frontend/   Seite zum Passwort-Reset (optional)
index.html                Einstieg/Landingpage
Nach dem Login startet die Anwendung auf dashboard.html.
Funktionsübersicht
Interaktive Lektionen mit Feedback in verschiedenen Schwierigkeitsstufen
Gamification: XP- und Levelsystem zur Motivation
Fortschrittsanzeige pro Lektion, „Verstanden“-Button vergibt XP
Benutzerverwaltung mit Passwort-Hashing und JWT-Authentifizierung
Optionaler Gemini-Chatbot für SQL-Fragen und Aufgabenbewertung
Fortschritte und XP werden pro Benutzer gespeichert
Server & Ports
Server/Datei	Funktion	Port
loginBackend/server.js	Login-API & Fortschritt speichern	3001
signupBackend/server.js	Registrierung & Benutzerstatistiken	3002
hauptprogramm/server.js	Statischer Datei-Server (Frontend)	3003
hauptprogramm/gemini-api-proxy.cjs	Proxy zur Gemini-API (KI-Chatbot)	4000
Alle Server greifen auf dieselbe SQLite-Datenbank zu. Die Tabellen werden beim ersten Start automatisch erzeugt.
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
/api/auth/register	POST	Registrierung
Gemini-Proxy (hauptprogramm)
Route	Methode	Beschreibung
/api/gemini/aufgaben	GET	Beispielaufgaben generieren
/api/gemini/aufgabeSimilar	POST	Ähnliche Aufgabe erzeugen
/api/gemini/verify	POST	Nutzerantwort bewerten
Bei allen geschützten Routen muss ein gültiges JWT im Header stehen:
Authorization: Bearer <JWT>
Weitere Details finden sich direkt im Quellcode (z. B. auth.js, progress.js, gemini-api-proxy.cjs).
Datenbankstruktur
Die zentrale Datei database.sqlite enthält folgende Tabellen:
users – Benutzerkonten (Vorname, E-Mail, Passwort-Hash)
progress – Fortschritt pro Lektion und Nutzer
button_progress – „Verstanden“-Klicks je Lektion (XP)
user_stats – XP, Level und Lernzeit pro Nutzer
Die Datenbank wird beim Start eines Backends automatisch erstellt bzw. erweitert.
Entwicklung & Erweiterung
Neue Lektionen können als lektionX.html im Ordner hauptprogramm/ ergänzt werden.
Weitere API-Routen lassen sich leicht in den Backends hinzufügen (Express.js).
Der Gemini-Chatbot kann durch eigene Prompts oder Funktionen erweitert werden.
Styling basiert auf Bootstrap und lässt sich anpassen.
Sicherheit & Hinweise
Passwörter werden mit bcryptjs gehasht.
Kritische API-Endpunkte sind per JWT geschützt.
Alle Daten liegen lokal in SQLite (keine Cloud).
Das Projekt dient Lernzwecken und ist nicht für den produktiven Einsatz gedacht. Für reale Nutzung sind zusätzliche Sicherheitsmaßnahmen (HTTPS, Umgebungsvariablen, Fehlerbehandlung usw.) erforderlich.
Kontakt & Mitmachen
Fragen, Feedback und Pull Requests sind jederzeit willkommen.
Für größere Anpassungen bitte vorher ein Issue erstellen.
Viel Erfolg beim Lernen mit SQLMate!