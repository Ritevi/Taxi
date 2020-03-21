const User = require('../../models/User').User;
const Room = require('../../models/Room').Room;


exports.post = function (req,res) {
    const {title = "" , description = "",StartTime=null,userId =null} = req.body;
    Room.createRoom(title,description,userId)
        .then((room)=>{
            res.send(room.getJSON());
        })
        .catch(err=>{
            res.send(err.toJSON());
        })
};


exports.get = function (req,res) {
    const roomId = req.body.roomId||null;
    Room.findRoom(roomId)
        .then((room)=>{
            res.send(room.getJSON());
        })
        .catch((err)=>{
            res.send(err.toJSON());
        })
};


exports.join = function (req,res) {
    const {roomId=null,userId=null} = req.body;
    Room.join(roomId,userId)
        .then((room)=>{
            res.send(room.getJSON());
        })
        .catch((err)=>{
            res.send(err.toJSON());
        })
};


exports.subscribe = function (req,res) {
    const {roomId=null,userId=null} = req.body;
    Room.subscribe(roomId,userId)
        .then((room)=>{
            res.send(room.getJSON());
        })
        .catch((err)=>{
            res.send(err.toJSON());
        })
};

exports.delete = function (req,res) {
    const roomId = req.body.userId||null;
}