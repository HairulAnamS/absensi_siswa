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

const search = (keyword, callback) => {
  const q = `%${keyword}%`;
  db.query('SELECT * FROM kelas WHERE kode LIKE ? OR nama LIKE ? ORDER BY nama', [q, q], callback);
};

const filterByKolom = (kolom, nilai, callback) => {
  const allowed = ['kode', 'nama']; // validasi kolom yang boleh
  if (!allowed.includes(kolom)) {
    return callback(null, []); // return kosong kalau kolom tidak valid
  }

  // const sql = `SELECT * FROM kelas WHERE ${kolom} LIKE ? ORDER BY nama`;
  // db.query(sql, [`%${nilai}%`], callback);
  const q = `%${nilai}%`;
  db.query('SELECT * FROM kelas WHERE kode LIKE ? OR nama LIKE ? ORDER BY nama', [q, q], callback);
};

module.exports = { getAll, insert, update, remove, findByKode, search, filterByKolom };
