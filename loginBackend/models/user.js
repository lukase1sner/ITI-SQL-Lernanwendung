// Zugriff auf die Datenbankverbindung
const db = require('../db');

/**
 * Erstellt einen neuen Benutzer in der Datenbank.
 *
 * @param {string} email            - Die E-Mail-Adresse des neuen Nutzers
 * @param {string} hashedPassword   - Der gehashte Passwort-String (z. B. bcrypt)
 * @param {function} callback       - Callback-Funktion für Fehler oder Rückgabe des neuen Benutzers
 */
const createUser = (email, hashedPassword, callback) => {
  const query = `INSERT INTO users (email, password) VALUES (?, ?)`;

  db.run(query, [email, hashedPassword], function (err) {
    if (err) return callback(err); // Fehler weiterleiten (z. B. bei doppelter E-Mail)

    // Rückgabe des neu erstellten Benutzers mit generierter ID
    callback(null, { id: this.lastID, email });
  });
};

/**
 * Holt einen Benutzer aus der Datenbank anhand der E-Mail-Adresse.
 *
 * @param {string} email            - Die E-Mail, nach der gesucht wird
 * @param {function} callback       - Callback mit Benutzerobjekt oder Fehler
 */
const getUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], (err, row) => {
    if (err) return callback(err); // Fehler weitergeben
    callback(null, row);           // Gibt das Benutzerobjekt zurück (oder null, wenn nicht gefunden)
  });
};

// Export der Funktionen für andere Module (z. B. Authentifizierungs-API)
module.exports = {
  createUser,
  getUserByEmail
};
