// models/userModel.js
module.exports = {
  getUserByUsername: (username, callback) => {
    // Sementara pakai user hardcoded
    const user = {
      username: 'admin',
      password: 'admin' // plaintext untuk contoh sederhana
    };

    if (username === user.username) {
      callback(null, user);
    } else {
      callback(null, null);
    }
  }
};
