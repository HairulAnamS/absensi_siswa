const db = require('../config/db');

const getAll = (callback) => {
  const sql = `
    SELECT s.*, k.nama AS nama_kelas 
      FROM siswa s
      LEFT JOIN kelas k ON (s.kelas_id = k.id) 
    ORDER BY s.nama`;
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

const filterByKolom = (kolom, nilai, callback) => {
  // const allowed = ['nis', 'nama']; // validasi kolom yang boleh
  // if (!allowed.includes(kolom)) {
  //   return callback(null, []); // return kosong kalau kolom tidak valid
  // }

  const q = `%${nilai}%`;
  const sql = `SELECT s.*, k.nama as nama_kelas
                 FROM siswa s
                 LEFT JOIN kelas k ON (s.kelas_id = k.id)
              WHERE s.nis LIKE ? OR s.nama LIKE ? 
              OR IF(s.jk = "L", "Laki-laki", "Perempuan") LIKE ?
              OR k.nama LIKE ?
              ORDER BY nama`;
  db.query(sql, [q, q, q, q], callback);
};

const findByNis = (nis, callback) => {
  db.query('SELECT * FROM siswa WHERE nis = ?', [nis], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // kembalikan 1 data jika ada
  });
};

module.exports = { getAll, getByKelas, insert, update, remove, filterByKolom, findByNis };
