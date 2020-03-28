const Room = require("../../models/Room").Room;

exports.post = function (req, res) {
  const { title, description, StartTime, userId } = req.body;
  Room.createRoom(title, description, StartTime, userId)
    .then((room) => {
      return room.getJSON();
    })
    .then((jsonRoom) => {
      res.json(jsonRoom);
    })
    .catch((err) => {
      res.json(err).status(err.status);
    });
};

exports.get = function (req, res) {
  const { closed, offset, limit } = req.query;
  Room.getRooms(limit, offset, closed)
    .then((rooms) => {
      const result = rooms.map((room) => {
        return room.getJSON().then((jsonRoom) => {
          return jsonRoom;
        });
      });
      Promise.all(result).then((result) => {
        res.json(result);
      });
    })
    .catch((err) => {
      res.json(err).status(err.status);
    });
};
