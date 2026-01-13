const jwt = require("jsonwebtoken");
const { secret_key } = require("../config/env");

const generateToken = user => {
  return jwt.sign({ id: user.id }, secret_key, {
    expiresIn: "1h",
  });
};

module.exports = generateToken;
