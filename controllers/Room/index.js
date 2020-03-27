const Room = require('../../models/Room').Room;


exports.post = function (req,res) {
    const {title = "" , description = "",StartTime=null,userId =null} = req.body;
    Room.createRoom(title,description,StartTime,userId)
        .then((room)=>{
            room.getJSON().then((jsonRoom)=>{
                res.json(jsonRoom);
            })
        })
        .catch(err=>{
            res.json(err).status(err.status);
        })
};

exports.get = function (req,res) {

};