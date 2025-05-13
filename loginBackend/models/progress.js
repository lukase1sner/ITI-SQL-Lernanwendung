const db = require('../db');

const saveProgress = (userId, lessonId, percent, callback) => {
  const query = `
    INSERT INTO progress (user_id, lesson_id, percent)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, lesson_id) DO UPDATE SET percent = excluded.percent
  `;
  db.run(query, [userId, lessonId, percent], function (err) {
    if (err) return callback(err);
    callback(null);
  });
};

const getProgressByUser = (userId, callback) => {
  const query = `SELECT lesson_id, percent FROM progress WHERE user_id = ?`;
  db.all(query, [userId], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

module.exports = {
  saveProgress,
  getProgressByUser
};
