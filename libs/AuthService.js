const jwt = require("jsonwebtoken");
const config = require("../config");
const Room = require("../models/Room").Room;
const error = require("../libs/Error");

class AuthService {
  static signature = config.get("JWT:secret");
  static expiration = config.get("JWT:expiresIn");

  static generateToken(user) {
    return jwt.sign({ user }, this.signature, { expiresIn: this.expiration });
  }

  static verifyToken(token) {
    return jwt.verify(token, this.signature);
  }
}

module.exports = AuthService;
