const AuthService = require("../libs/AuthService");
const User = require("../models/User").User;
const error = require("../libs/Error");

module.exports = async function (req, res, next) {
  const { userId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  let verifiedToken = {};
  if (token) {
    verifiedToken = AuthService.verifyToken(token);
  } else {
    return next(new error("Auth", "NO_TOKEN", 401, "please login or register"));
  }
  try {
    let user = await User.getUserById(verifiedToken.user.id);
    if (Number(user.id) === Number(userId)) {
      return next();
    } else {
      return next(new error("Auth", "userId", 401));
    }
  } catch (err) {
    next(err);
  }
};
