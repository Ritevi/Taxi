const Room = require("../../models/Room").Room;

exports.get = function (req, res, next) {
  const roomId = req.params.roomId;
  Room.findRoom(roomId)
    .then((room) => {
      room.getJSON().then((jsonRoom) => {
        res.json(jsonRoom);
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.delete = function (req, res, next) {
  const roomId = req.params.roomId;
  Room.deleteRoom(roomId)
    .then((room) => {
      console.log(room);
      room.getJSON().then((room) => {
        res.json(room);
      });
    })
    .catch((err) => {
      next(err);
    });
};
