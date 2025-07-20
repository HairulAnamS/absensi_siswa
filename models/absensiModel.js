const db = require('../config/db');

const getAll = (callback) => {
  const sql = `
    SELECT a.*, s.nis, s.nama, k.nama AS kelas
    FROM absensi a
    LEFT JOIN siswa s ON (a.siswa_id = s.id)
    LEFT JOIN kelas k ON (s.kelas_id = k.id)
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

const update = (id, data, callback) => {
  db.query('UPDATE absensi SET ? WHERE id = ?', [data, id], callback);
};

const getFiltered = (filter, callback) => {
  let sql = `
    SELECT a.*, s.nis, s.nama, k.nama AS kelas
    FROM absensi a
    LEFT JOIN siswa s ON a.siswa_id = s.id
    LEFT JOIN kelas k ON s.kelas_id = k.id
    WHERE 1=1
  `;

  const params = [];

  if (filter.tglAwal) {
    sql += ' AND a.tanggal >= ?';
    params.push(filter.tglAwal);
  }
  if (filter.tglAkhir) {
    sql += ' AND a.tanggal <= ?';
    params.push(filter.tglAkhir);
  }
  if (filter.nis) {
    sql += ' AND s.nis LIKE ?';
    params.push(`%${filter.nis}%`);
  }
  if (filter.nama) {
    sql += ' AND s.nama LIKE ?';
    params.push(`%${filter.nama}%`);
  }
  if (filter.kelas_id) {
    sql += ' AND k.id = ?';
    params.push(filter.kelas_id);
  }

  sql += ' ORDER BY a.tanggal DESC, k.nama, s.nama';
  db.query(sql, params, callback);
};

const getPeriodeList = (callback) => {
  const sql = `SELECT DISTINCT DATE_FORMAT(tanggal, '%Y-%m') AS periode FROM absensi ORDER BY periode DESC`;
  db.query(sql, callback);
};

const getRekapByBulanDanKelas = (bulan, kelas_id, callback) => {
  const bulanAwal = `${bulan}-01`;
  const bulanAkhir = `${bulan}-31`;

  const sql = `
    SELECT s.nis, s.nama, k.nama AS nama_kelas,
      SUM(a.kehadiran = 'Ijin') AS ijin,
      SUM(a.kehadiran = 'Sakit') AS sakit,
      SUM(a.kehadiran = 'Alpha') AS alpha
    FROM siswa s
    LEFT JOIN kelas k ON (s.kelas_id = k.id)
    LEFT JOIN absensi a ON a.siswa_id = s.id AND a.tanggal BETWEEN ? AND ?
    WHERE s.kelas_id = ?
    GROUP BY s.id
    ORDER BY s.nama
  `;
  console.log('QUERY: ', sql);

  db.query(sql, [bulanAwal, bulanAkhir, kelas_id], callback);
};

const getRekapByRentangBulan = (tanggalAwal, tanggalAkhir, kelas_id, callback) => {
  const sql = `
    SELECT s.nis, s.nama, k.nama AS nama_kelas,
      SUM(a.kehadiran = 'Ijin') AS ijin,
      SUM(a.kehadiran = 'Sakit') AS sakit,
      SUM(a.kehadiran = 'Alpha') AS alpha
    FROM siswa s
    LEFT JOIN kelas k ON s.kelas_id = k.id
    LEFT JOIN absensi a ON a.siswa_id = s.id AND a.tanggal BETWEEN ? AND ?
    WHERE s.kelas_id = ?
    GROUP BY s.id
    ORDER BY s.nama
  `;

  console.log('QUERY: ', sql);
  db.query(sql, [tanggalAwal, tanggalAkhir, kelas_id], callback);
};




module.exports = { getAll, insertBulk, remove, getFiltered, update, getPeriodeList, getRekapByBulanDanKelas, getRekapByRentangBulan };
