const Room = require("../../models/Room").Room;

exports.post = function (req, res) {
  const { roomId } = req.params;
  const { userId } = req.body;
  Room.changeOwner(roomId, userId)
    .then((room) => {
      return room.getJSON();
    })
    .then((jsonRoom) => {
      res.json(jsonRoom);
    })
    .catch((err) => {
      console.error(err);
      res.json(err).status(err.status);
    });
};

exports.get = function (req, res) {
  const { roomId } = req.params;
  Room.getOwnerByRoomID(roomId)
    .then((owner) => {
      res.json(owner.getJSON());
    })
    .catch((err) => {
      res.json(err).status(err.status);
    });
};
