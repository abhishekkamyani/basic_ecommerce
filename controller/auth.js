const fs = require("fs");
const path = require("path");
const model = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = model.User;
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../jwt_keys/private.key")
);

exports.signup = (req, res) => {
  const user = User(req.body);
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const bcrypt_password = bcrypt.hashSync(req.body.password, 10);

  user.token = token;
  user.password = bcrypt_password;
  user
    .save()
    .then((doc) => res.send({ token }))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).json({ message: "Email address already exists" });
      } else {
        res.status(400).json(err.message);
      }
    });
};

exports.signin = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      const token = jwt.sign({email: req.body.email}, privateKey, {algorithm: "RS256"});

      doc.token = token;
      await doc.save();
      res.json({token});

    } else {
      res.status(401).json("Invalid email or password");
    }
  } catch (error) {
    res.status(401).json("Error: " + error);
  }
};
