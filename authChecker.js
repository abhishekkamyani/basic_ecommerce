const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require('path');
const publicKey = fs.readFileSync(path.resolve(__dirname, "./jwt_keys/public.key"));
exports.auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    const auth = jwt.verify(token, publicKey, { algorithm: "RS256" });
    if (auth.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
