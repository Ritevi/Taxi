var error = require('../models/User').CustomError;

module.exports = function (req,res,next) {
    if (!req.session.user) {
        return next(new error('middleware',"NO_USER").status(401));
    }
    next();
};