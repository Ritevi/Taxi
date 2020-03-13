var User = require('../models/User').User;
const error = require('../libs/Error');

module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    if (!req.session.passport) return next();
    var id = req.session.passport.user.id;
    User.findOne({where:{id}})
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

