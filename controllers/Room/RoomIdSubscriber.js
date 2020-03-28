const Room = require("../../models/Room").Room;

exports.post = function (req, res) {
  const { roomId } = req.params;
  const { userId } = req.body;
  Room.subscribe(roomId, userId)
    .then((room) => {
      room.getJSON().then((jsonRoom) => {
        res.json(jsonRoom);
      });
    })
    .catch((err) => {
      res.json(err).status(err.status);
    });
};
