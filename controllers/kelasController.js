const Kelas = require('../models/kelasModel');

exports.list = (req, res) => {
  Kelas.getAll((err, rows) => {
    res.render('kelas', {
      user: req.session.nama,
      kelas: rows
    });
  });
};

exports.tambah = (req, res) => {
  const { kode, nama } = req.body;
  Kelas.insert({ kode, nama }, () => {
    res.redirect('/kelas');
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
