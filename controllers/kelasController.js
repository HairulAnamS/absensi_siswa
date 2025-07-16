const Kelas = require('../models/kelasModel');

// exports.list = (req, res) => {
//   Kelas.getAll((err, rows) => {
//     res.render('kelas', {
//       user: req.session.nama,
//       kelas: rows
//     });
//   });
// };

exports.list = (req, res) => {
  const cari = req.query.cari || '';
  const kolom = req.query.kolom || 'nama'; // default 'nama'

  if (cari) {
    Kelas.filterByKolom(kolom, cari, (err, rows) => {
      if (err) return res.send('Terjadi kesalahan saat filter data.');
      res.render('kelas', {
        user: req.session.nama,
        kelas: rows,
        filter: cari,
        filterKolom: kolom
      });
    });
  } else {
    Kelas.getAll((err, rows) => {
      res.render('kelas', {
        user: req.session.nama,
        kelas: rows,
        filterKolom: ''
      });
    });
  }
};


exports.tambah = (req, res) => {
  const { kode, nama } = req.body;

  Kelas.findByKode(kode, (err, existing) => {
    if (err) return res.send('Terjadi kesalahan saat mengecek kode.');

    if (existing) {
      // Jika kode sudah ada, tampilkan peringatan
      Kelas.getAll((err, rows) => {
        res.render('kelas', {
          user: req.session.nama,
          kelas: rows,
          error: 'Kode kelas sudah ada.'
        });
      });
    } else {
      // Jika tidak ada, lanjut tambah
      Kelas.insert({ kode, nama }, () => {
        res.redirect('/kelas');
      });
    }
  });

};

exports.hapus = (req, res) => {
  Kelas.remove(req.params.id, () => {
    res.redirect('/kelas');
  });
};

exports.edit = (req, res) => {
  const { kode, nama } = req.body;
  Kelas.update(req.params.id, { kode, nama }, () => {
    res.redirect('/kelas');
  });
};
