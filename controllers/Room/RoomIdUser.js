const Room = require("../../models/Room").Room;

exports.post = function (req, res, next) {
  const { roomId } = req.params;
  const { userId } = req.body;
  Room.join(roomId, userId)
    .then((room) => {
      return room.getJSON();
    })
    .then((jsonRoom) => {
      res.json(jsonRoom);
    })
    .catch((err) => {
      next(err);
    });
};
