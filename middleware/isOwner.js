const isOwner = require('../libs/AuthService').isOwner;
const error  = require('../libs/Error');

module.exports = function (req,res,next) {
    const {roomId,userId} = req.params;
    var result = isOwner(roomId,userId);
    if(result!==true){
        res.json({isOwner:false,err:error.SeqInCustom(result[0])});
    }
    next();
};