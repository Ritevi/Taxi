var User = require('../models/User').User;
const error = require('../models/User').CustomError;

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    if (!req.session.user) return next();
    var id = req.session.user.id;
    var username = req.session.user.username;
    console.log("loadUser");
    User.findOne({where:{username:username,id:id}})
        .then((user)=>{
            if(user){
                req.user = res.locals.user = user;
                next();
            } else {
                next(new error('middleware',"NO_USER"));
            }
        })
        .catch((err)=>{
            next(err);
        })
};

