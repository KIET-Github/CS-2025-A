const { SECRET } = require("../config");
const jwt = require("jsonwebtoken");
class JwtService {
  static sign(payload, expiry = "1y", secret = SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = SECRET) {
    return jwt.verify(token, secret);
  }
}
module.exports = JwtService;
