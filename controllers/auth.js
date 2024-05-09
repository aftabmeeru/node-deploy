require('dotenv').config();
const model = require("../models/user");
const User = model.User;
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const privateKey = fs.readFileSync(path.resolve(__dirname,'../private.key'), 'utf-8');

// below code is used before learning authentication using JWT
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8')); // we should set path
// const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json'), 'utf-8'));

exports.signUp = (req, res) => {
  const user = new User(req.body);
  // const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
  const token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: "RS256" });

  // hash password generation
  const hash = bcrypt.hashSync(req.body.password, 10);

  user.token = token;
  user.password = hash;

  user
    .save()
    .then(() => {
      res.status(201).json({ token });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};


exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // verifying password
    const isAuth = bcrypt.compareSync(req.body.password, user.password);
    if(isAuth) {
      const token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: "RS256" });
      user.token = token;
      user
        .save()
        .then(() => {
          res.json({ token })
        })
    }
  } catch (error) {
    res.send(401).json(error);
  }
}