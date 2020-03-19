const User = require('../../models/User').User;
const Room = require('../../models/Room').Room;


exports.post = function (req,res) {
    const {title = "" , description = "",StartTime=null} = req.body;
    const userId = req.session.passport.user.id || '';
    Room.createRoom(title,description,userId)
        .then((room)=>{
            res.send(room.getJSON());
        })
        .catch(err=>{
            res.send(err.toJSON()).status();
        })
};

exports.get = function (req,res) {
    const roomId = req.body.roomId;
    Room.findRoom(roomId)
        .then((room)=>{
            res.send(room);
        })
        .catch((err)=>{
            res.send(err);
        })
};