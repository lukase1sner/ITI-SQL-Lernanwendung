# ITI-SQL-Lernanwendung
# SQLMate – ITI‑SQL‑Lernanwendung

SQLMate ist ein kleines Übungsprojekt, das die Grundlagen von SQL mit spielerischen Elementen vermittelt. Die Anwendung besteht aus mehreren Node.js‑Servern sowie Frontend‑Seiten für Registrierung, Login und das eigentliche Lernen. Ein optional angebundener KI‑Chatbot (Gemini) hilft beim Lösen der Aufgaben.

## Inhalt

1. [Schnellstart](#schnellstart)
2. [Projektstruktur](#projektstruktur)
3. [Funktionen](#funktionen)
4. [Server & Ports](#server--ports)
5. [API-Überblick](#api-%C3%BCberblick)
6. [Datenbank](#datenbank)
7. [Weiteres](#weiteres)

## Schnellstart

1. **Node.js** installieren (empfohlen ab Version 18).
2. Repository klonen: `git clone <repo>`
3. Abhängigkeiten installieren:
   ```bash
   cd loginBackend && npm install
   cd ../hauptprogramm && npm install
   ```
4. Optional: Im Ordner `hauptprogramm` eine `.env` anlegen und `GEMINI_API_KEY=<dein_api_key>` setzen, falls der Chatbot verwendet werden soll.
5. Server in separaten Terminals starten:
   ```bash
   node loginBackend/server.js             # Authentifizierung und Fortschritt (Port 3001)
   node signupBackend/server.js            # Registrierung & Stats (Port 3001)
   node hauptprogramm/gemini-api-proxy.cjs # Proxy zu Gemini (Port 4000)
   node hauptprogramm/server.js            # Lernplattform (Port 3003)
   ```
6. `http://localhost:3003/index.html` im Browser aufrufen.

## Projektstruktur

```text
├── hauptprogramm/        # HTML/CSS/JS der Lernplattform und Gemini-Proxy
├── loginBackend/         # Express-API für Login und Fortschritt
├── signupBackend/        # Beispielhafte Registrierung & Statistiken
├── loginFrontend/        # Minimaler Login-Screen
├── signupFrontend/       # Minimaler Registrierungs-Screen
├── resetpassword-frontend/  # einfache Seite zum Zurücksetzen des Passworts
└── index.html            # Landingpage mit Infos und Links zu Login/Signup
```

Jede Lektion liegt als einzelne HTML-Datei in `hauptprogramm/lektion*.html`. Der Einstiegspunkt für Benutzer ist `index.html` beziehungsweise `hauptprogramm/dashboard.html` nach dem Login.

## Funktionen

* **Interaktive Lektionen** – SQL-Aufgaben in mehreren Stufen mit unmittelbarem Feedback.
* **Gamification** – XP und Level aus `user_stats` belohnen den Lernfortschritt.
* **Gemini-Chatbot** – beantwortet Fragen, generiert Übungsaufgaben und prüft SQL-Befehle.
* **Progress Tracking** – Speichert pro Lektion den prozentualen Fortschritt des Nutzers.
* **Registrierung & Login** – Passwörter werden gehasht, Authentifizierung erfolgt via JWT.

## Server & Ports

| Server                     | Zweck                               | Port |
| -------------------------- | ----------------------------------- | ---: |
| `loginBackend/server.js`   | Login-API und Fortschritt speichern | 3001 |
| `signupBackend/server.js`  | Registrierung und Statistiken       | 3001 |
| `hauptprogramm/server.js`  | Statischer Datei-Server (Frontend)  | 3003 |
| `hauptprogramm/gemini-api-proxy.cjs` | Weiterleitung an Gemini-API | 4000 |

Die Backends nutzen SQLite (`database.sqlite`) und erstellen die Tabellen bei Bedarf selbst.

## API-Überblick

### Authentifizierung (`loginBackend`)

* `POST /api/auth/register` – Benutzer anlegen
* `POST /api/auth/login` – Login, gibt JWT zurück
* `POST /api/progress` – Fortschritt speichern (JWT benötigt)
* `GET /api/progress` – Fortschritt abrufen (JWT benötigt)

### Gemini-Proxy (`hauptprogramm`)

* `GET /api/gemini/aufgaben?topic=SELECT` – Beispielaufgaben generieren
* `POST /api/gemini/verify` – Nutzerantwort bewerten

Weitere Routen findest du direkt im Quellcode der jeweiligen Server.

## Datenbank

Alle Server greifen auf eine lokale SQLite-Datenbank zu. Beim ersten Start werden folgende Tabellen erzeugt:

* `users` – gespeicherte Accounts
* `progress` – Fortschritt pro Lektion
* `user_stats` – XP und Gesamtzeit

Die Datenbankdatei liegt je nach Server im Unterordner und heißt `database.sqlite`.

## Weiteres

* Der Quellcode dient ausschließlich Lernzwecken. Für produktive Szenarien sollten Umgebungsvariablen verwendet und Sicherheitsaspekte (HTTPS, Passwort-Reset) beachtet werden.
* Einige Frontend-Seiten laden externe Libraries (Bootstrap, particles.js) per CDN.
* Pull Requests und Feedback sind willkommen!
