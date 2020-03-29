const Room = require("../../models/Room").Room;

exports.delete = function (req, res, next) {
  const { roomId, userId } = req.params;
  Room.unsubscribe(roomId, userId)
    .then((room) => {
      room.getJSON().then((jsonRoom) => {
        res.json(jsonRoom);
      });
    })
    .catch((err) => {
      next(err);
    });
};
