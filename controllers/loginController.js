const userModel = require('../models/userModel');

exports.formLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.prosesLogin = (req, res) => {
  const { username, password } = req.body;
  //const user = userModel.find(username, password);

  if (username == 'admin' && password == 'admin') {
    req.session.loggedIn = true;
    req.session.username = username;
    req.session.nama = username;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Username atau password salah' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
