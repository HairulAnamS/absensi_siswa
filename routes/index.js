const express = require('express');
const router = express.Router();

// Import controller
const loginController = require('../controllers/loginController');
const kelasController = require('../controllers/kelasController');
const siswaController = require('../controllers/siswaController');
const absensiController = require('../controllers/absensiController');

// ==== Login ====
router.get('/login', loginController.formLogin);
router.post('/login', loginController.prosesLogin);
router.get('/logout', loginController.logout);

// ==== Middleware Auth ====
router.use((req, res, next) => {
  if (!req.session.loggedIn && req.path !== '/login') {
    return res.redirect('/login');
  }
  next();
});

// ==== Dashboard Redirect ====
router.get('/', (req, res) => {
  res.redirect('/kelas');
});

// ==== Kelas ====
router.get('/kelas', kelasController.list);
router.post('/kelas/tambah', kelasController.tambah);
router.post('/kelas/hapus/:id', kelasController.hapus);
router.post('/kelas/edit/:id', kelasController.edit);

// ==== Siswa ====
router.get('/siswa', siswaController.list);
router.post('/siswa/tambah', siswaController.tambah);
router.post('/siswa/hapus/:id', siswaController.hapus);
router.post('/siswa/edit/:id', siswaController.edit);

// ==== Absensi ====
router.get('/absensi', absensiController.listRekap);
router.get('/absensi/input', absensiController.formInput);
router.post('/absensi/simpan', absensiController.simpan);
router.post('/absensi/hapus/:id', absensiController.hapus);

module.exports = router;
