const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'anam',        // Ganti jika user MySQL-mu berbeda
  password: 'Anamroot_12345',        // Ganti dengan password MySQL-mu
  database: 'absensi_db',
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal: ', err);
    return;
  }
  console.log('Tersambung ke database MySQL');
});

module.exports = db;
