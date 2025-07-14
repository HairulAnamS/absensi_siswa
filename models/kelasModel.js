const db = require('../config/db');

const getAll = (callback) => {
  db.query('SELECT * FROM kelas ORDER BY nama', callback);
};

const insert = (data, callback) => {
  db.query('INSERT INTO kelas SET ?', data, callback);
};

const update = (id, data, callback) => {
  db.query('UPDATE kelas SET ? WHERE id = ?', [data, id], callback);
};

const remove = (id, callback) => {
  db.query('DELETE FROM kelas WHERE id = ?', [id], callback);
};

module.exports = { getAll, insert, update, remove };
