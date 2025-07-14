const db = require('../config/db');

const getRekap = (callback) => {
  const sql = `
    SELECT a.*, s.nis, s.nama, k.nama AS kelas
    FROM absensi a
    LEFT JOIN siswa s ON a.siswa_id = s.id
    LEFT JOIN kelas k ON s.kelas_id = k.id
    ORDER BY a.tanggal DESC, k.nama, s.nama`;
  db.query(sql, callback);
};

const insertBulk = (dataArray, callback) => {
  const sql = `
    INSERT INTO absensi (tanggal, siswa_id, kelas_id, kehadiran, keterangan)
    VALUES ?`;
  const values = dataArray.map(d => [
    d.tanggal, d.siswa_id, d.kelas_id, d.kehadiran, d.keterangan
  ]);
  db.query(sql, [values], callback);
};

const remove = (id, callback) => {
  db.query('DELETE FROM absensi WHERE id = ?', [id], callback);
};

module.exports = { getRekap, insertBulk, remove };
