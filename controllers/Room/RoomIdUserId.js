const Room = require("../../models/Room").Room;

exports.delete = function (req, res) {
  const { roomId, userId } = req.params;
  Room.quit(roomId, userId)
    .then((room) => {
      room.getJSON().then((jsonRoom) => {
        res.json(jsonRoom);
      });
    })
    .catch((err) => {
      res.json(err).status(err.status);
    });
};
