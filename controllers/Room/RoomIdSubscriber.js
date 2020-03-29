const Room = require("../../models/Room").Room;

exports.post = function (req, res, next) {
  const { roomId } = req.params;
  const { userId } = req.body;
  Room.subscribe(roomId, userId)
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

exports.get = function (req, res, next) {
  const { roomId } = req.params;
  Room.getSubs(roomId)
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
