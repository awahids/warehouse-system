const Bcrypt = require("bcrypt");

module.exports = {
  authHash: async (password) => {
    return new Promise((resolve, reject) => {
      Bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        Bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    });
  },
};
