const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Ganti jika user MySQL-mu berbeda
  password: 'anam789',        // Ganti dengan password MySQL-mu
  database: 'absensi_db',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal: ', err);
    return;
  }
  console.log('Tersambung ke database MySQL');
});

module.exports = db;
