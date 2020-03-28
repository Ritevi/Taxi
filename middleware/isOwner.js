const AuthService = require("../libs/AuthService");
const Room = require("../models/Room").Room;
const error = require("../libs/Error");

module.exports = function (req, res, next) {
  const { roomId } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  let verifiedToken = {};
  if (token) {
    verifiedToken = AuthService.verifyToken(token);
  } else {
    return next(new error("Auth", "NO_TOKEN", 401, "please login or register"));
  }
  Room.isOwner(roomId, verifiedToken.user.id)
    .then((result) => {
      return result
        ? next()
        : next(
            new error("Auth", "IS_OWNER", 401, "you are not owner").toJSON()
          );
    })
    .catch((err) => {
      return next({ isOwner: false, err: err.toJSON() });
    });
};
