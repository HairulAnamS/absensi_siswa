const Siswa = require('../models/siswaModel');
const Kelas = require('../models/kelasModel');

exports.list = (req, res) => {
  const cari = req.query.cari || '';
  const kolom = req.query.kolom || 'nama'; // default 'nama'

  if (cari) {
    Siswa.filterByKolom(kolom, cari, (err, siswaList) => {
      if (err) return res.send('Terjadi kesalahan saat filter data.');
      Kelas.getAll((err2, kelasList) => {
        res.render('siswa', {
          user: req.session.nama,
          siswa: siswaList,
          kelas: kelasList,
          filter: cari,
          filterKolom: kolom
        });
      });
    });
  } else {
    Siswa.getAll((err, siswaList) => {
      Kelas.getAll((err2, kelasList) => {
        res.render('siswa', {
          user: req.session.nama,
          siswa: siswaList,
          kelas: kelasList,
          filterKolom: ''
        });
      });
    });
  }
};

exports.tambah = (req, res) => {
  const { nis, nama, jk, kelas_id } = req.body;

  Siswa.findByNis(nis, (err, existing) => {
    if (err) return res.send('Terjadi kesalahan saat mengecek kode.');

    if (existing) {
      // Jika nis sudah ada, tampilkan peringatan
      Siswa.getAll((err, siswaList) => {
        Kelas.getAll((err2, kelasList) => {
          res.render('siswa', {
            user: req.session.nama,
            siswa: siswaList,
            kelas: kelasList,
            filterKolom: '',
            error: 'Nis siswa sudah ada.'
          });
        });
      });
    } else {
      // Jika tidak ada, lanjut tambah
      Siswa.insert({ nis, nama, jk, kelas_id }, () => {
        res.redirect('/siswa');
      });
    }
  });

};

exports.hapus = (req, res) => {
  Siswa.remove(req.params.id, () => {
    res.redirect('/siswa');
  });
};

exports.edit = (req, res) => {
  const { nis, nama, jk, kelas_id } = req.body;
  Siswa.update(req.params.id, { nis, nama, jk, kelas_id }, () => {
    res.redirect('/siswa');
  });
};
