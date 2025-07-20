const Absensi = require('../models/absensiModel');
const Siswa = require('../models/siswaModel');
const Kelas = require('../models/kelasModel');

exports.listRekap = (req, res) => {
  // Absensi.getAll((err, data) => {
  //   res.render('absensi', {
  //     user: req.session.nama,
  //     absensi: data
  //   });
  // });

  const filter = {
    tglAwal: req.query.tglAwal || new Date().toISOString().slice(0, 10),
    tglAkhir: req.query.tglAkhir || new Date().toISOString().slice(0, 10),
    nis: req.query.nis || '',
    nama: req.query.nama || '',
    kelas_id: req.query.kelas_id || ''
  };

  Kelas.getAll((err1, kelasList) => {
    Absensi.getFiltered(filter, (err, data) => {
      res.render('absensi', {
        user: req.session.nama,
        absensi: data,
        filter,
        kelasList
      });
    });
  });
};

exports.formInput = (req, res) => {
  const selectedKelasId = req.query.kelas_id || '';
  const selectedTanggal = req.query.tanggal || new Date().toISOString().split('T')[0];

  Kelas.getAll((err1, kelasList) => {
    if (selectedKelasId) {
      Siswa.getByKelas(selectedKelasId, (err2, siswaList) => {
        res.render('inputAbsensi', {
          user: req.session.nama,
          kelas: kelasList,
          selectedKelasId,
          siswa: siswaList,
          tanggal: selectedTanggal,
          today: new Date().toISOString().slice(0, 10)
        });
      });
    } else {
      res.render('inputAbsensi', {
        user: req.session.nama,
        kelas: kelasList,
        selectedKelasId: '',
        siswa: [],
        tanggal: selectedTanggal,
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

exports.edit = (req, res) => {
  const { kehadiran, keterangan } = req.body;
  const id = req.params.id;

  Absensi.update(req.params.id, { kehadiran, keterangan }, () => {
    res.redirect('/absensi');
  });
};

exports.rekapForm = (req, res) => {
  Absensi.getPeriodeList((err1, hasil) => {
    const bulanTahun = hasil.map(r => r.periode);

    Kelas.getAll((err2, kelasList) => {
      res.render('rekapAbsensi', {
        bulanTahun,
        kelasList,
        hasilRekap: null,
        selected: { bulan: '', kelas_id: '' }
      });
    });
  });
};

exports.rekapHasil = (req, res) => {
  const { bulanAwal, bulanAkhir, kelas_id } = req.query;

  const tanggalAwal = `${bulanAwal}-01`;
  
  const [tahun, bulan] = bulanAkhir.split('-');
  const lastDay = new Date(tahun, bulan, 0).getDate();
  const tanggalAkhir = `${bulanAkhir}-${lastDay}`;

  console.log('Tanggal Awal:', tanggalAwal);
  console.log('Tanggal Akhir:', tanggalAkhir);
  console.log('Kelas ID:', kelas_id);

  // Absensi.getRekapByBulanDanKelas(bulan, kelas_id, (err, hasil) => {
  Absensi.getRekapByRentangBulan(tanggalAwal, tanggalAkhir, kelas_id, (err, hasil) => {
    Absensi.getPeriodeList((e1, hasilBulan) => {
      const bulanTahun = hasilBulan.map(r => r.periode);
      Kelas.getAll((e2, kelasList) => {
        res.render('rekapAbsensi', {
          bulanTahun,
          kelasList,
          hasilRekap: hasil,
          selected: { bulanAwal, bulanAkhir, kelas_id }
        });
      });
    });
  });
};

