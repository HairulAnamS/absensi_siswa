const Absensi = require('../models/absensiModel');
const Siswa = require('../models/siswaModel');
const Kelas = require('../models/kelasModel');

exports.listRekap = (req, res) => {
  Absensi.getRekap((err, data) => {
    res.render('absensi', {
      user: req.session.nama,
      absensi: data
    });
  });
};

exports.formInput = (req, res) => {
  const selectedKelasId = req.query.kelas_id || '';
  Kelas.getAll((err1, kelasList) => {
    if (selectedKelasId) {
      Siswa.getByKelas(selectedKelasId, (err2, siswaList) => {
        res.render('inputAbsensi', {
          user: req.session.nama,
          kelas: kelasList,
          selectedKelasId,
          siswa: siswaList,
          today: new Date().toISOString().slice(0, 10)
        });
      });
    } else {
      res.render('inputAbsensi', {
        user: req.session.nama,
        kelas: kelasList,
        selectedKelasId: '',
        siswa: [],
        today: new Date().toISOString().slice(0, 10)
      });
    }
  });
};

exports.simpan = (req, res) => {
  const { tanggal, siswa_id, kelas_id, kehadiran, keterangan } = req.body;

  const dataArray = [];
  if (Array.isArray(siswa_id)) {
    for (let i = 0; i < siswa_id.length; i++) {
      dataArray.push({
        tanggal,
        siswa_id: siswa_id[i],
        kelas_id,
        kehadiran: kehadiran[i],
        keterangan: keterangan[i]
      });
    }
  } else {
    dataArray.push({ tanggal, siswa_id, kehadiran, keterangan });
  }

  Absensi.insertBulk(dataArray, () => {
    res.redirect('/absensi');
  });
};

exports.hapus = (req, res) => {
  Absensi.remove(req.params.id, () => {
    res.redirect('/absensi');
  });
};
