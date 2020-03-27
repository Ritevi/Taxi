const Room = require('../../models/Room').Room;

exports.post = function (req,res) {
    const {roomId=null,userId=null} = req.params;
    Room.subscribe(roomId,userId)
        .then((room)=>{
            room.getJSON().then((jsonRoom)=>{
                res.json(jsonRoom);
            })
        })
        .catch((err)=>{
            res.json(err).status(err.status);
        })
};