const db = require('../db');

const createUser = (email, hashedPassword, callback) => {
  const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
  db.run(query, [email, hashedPassword], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, email });
  });
};

const getUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};

module.exports = {
  createUser,
  getUserByEmail
};
