const db = require('../config/db');

const getAll = (callback) => {
  const sql = `
    SELECT siswa.*, kelas.nama AS nama_kelas 
    FROM siswa 
    LEFT JOIN kelas ON siswa.kelas_id = kelas.id 
    ORDER BY siswa.nama`;
  db.query(sql, callback);
};

const getByKelas = (kelasId, callback) => {
  const sql = `SELECT * FROM siswa WHERE kelas_id = ? ORDER BY nama`;
  db.query(sql, [kelasId], callback);
};

const insert = (data, callback) => {
  db.query('INSERT INTO siswa SET ?', data, callback);
};

const update = (id, data, callback) => {
  db.query('UPDATE siswa SET ? WHERE id = ?', [data, id], callback);
};

const remove = (id, callback) => {
  db.query('DELETE FROM siswa WHERE id = ?', [id], callback);
};

module.exports = { getAll, getByKelas, insert, update, remove };
