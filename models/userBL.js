const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

exports.loginUser = function (uname, pwd) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ userName: uname});
   
    if (user) {
      resolve({ auth: true, token: uuidv4(), fullName: user.fullName });
    } else {
      reject({ message: 'Not Found' });
    }
  });
};

