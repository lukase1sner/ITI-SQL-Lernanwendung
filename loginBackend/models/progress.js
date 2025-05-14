// Zugriff auf die Datenbankverbindung (SQLite oder ähnliches)
const db = require('../db');

/**
 * Speichert oder aktualisiert den Fortschritt eines Benutzers in einer bestimmten Lektion.
 *
 * @param {number} userId    - Die ID des Benutzers
 * @param {number} lessonId  - Die ID der Lektion
 * @param {number} percent   - Der Fortschritt in Prozent (0–100)
 * @param {function} callback - Callback-Funktion zur Fehler- oder Erfolgsmeldung
 */
const saveProgress = (userId, lessonId, percent, callback) => {
  const query = `
    INSERT INTO progress (user_id, lesson_id, percent)
    VALUES (?, ?, ?)
    -- Wenn bereits ein Eintrag für user_id + lesson_id existiert, aktualisiere den Prozentwert
    ON CONFLICT(user_id, lesson_id) DO UPDATE SET percent = excluded.percent
  `;

  db.run(query, [userId, lessonId, percent], function (err) {
    if (err) return callback(err);   // Fehler weitergeben
    callback(null);                  // Erfolgreich
  });
};

/**
 * Holt alle gespeicherten Fortschrittswerte eines bestimmten Benutzers.
 *
 * @param {number} userId     - Die ID des Benutzers
 * @param {function} callback - Callback mit Ergebnisliste oder Fehler
 */
const getProgressByUser = (userId, callback) => {
  const query = `
    SELECT lesson_id, percent FROM progress WHERE user_id = ?
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) return callback(err);   // Fehler weitergeben
    callback(null, rows);            // Erfolgreiche Rückgabe der Ergebnisse (Array von Objekten)
  });
};

// Exportieren der Funktionen für Verwendung in anderen Modulen
module.exports = {
  saveProgress,
  getProgressByUser
};
