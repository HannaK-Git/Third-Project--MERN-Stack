const router = require('express').Router();

const userBL = require('../models/userBL');







router.route('/login').post(async function (req, res) {
  try {
    const { userName, password } = req.body;
   
    let u = await userBL.loginUser(userName, password);
    res.status(200).json(u);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;





