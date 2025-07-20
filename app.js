const express = require('express');
const session = require('express-session');
const path = require('path');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts'); // ← tambahkan ini
const app = express();

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts); // ← tambahkan ini
app.set('layout', 'layouts/layout'); // ← default layout

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'absensi_secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware Auth
app.use((req, res, next) => {
  // if (!req.session.loggedIn && req.path !== '/login') {
  //   return res.redirect('/login');
  // }
  res.locals.session = req.session;
  res.locals.path = req.path; // ← tambahkan ini
  next();
});

// Routes
const routes = require('./routes/index');
app.use('/', routes);

// Run Server
// app.listen(3000, () => console.log('Server running on http://localhost:3000'));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
  exec(`start http://localhost:${PORT}`);
});
