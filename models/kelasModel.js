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

const findByKode = (kode, callback) => {
  db.query('SELECT * FROM kelas WHERE kode = ?', [kode], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // kembalikan 1 data jika ada
  });
};

module.exports = { getAll, insert, update, remove, findByKode };
