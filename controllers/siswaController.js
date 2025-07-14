const Siswa = require('../models/siswaModel');
const Kelas = require('../models/kelasModel');

exports.list = (req, res) => {
  Siswa.getAll((err, siswaList) => {
    Kelas.getAll((err2, kelasList) => {
      res.render('siswa', {
        user: req.session.nama,
        siswa: siswaList,
        kelas: kelasList
      });
    });
  });
};

exports.tambah = (req, res) => {
  const { nis, nama, jk, kelas_id } = req.body;
  Siswa.insert({ nis, nama, jk, kelas_id }, () => {
    res.redirect('/siswa');
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
