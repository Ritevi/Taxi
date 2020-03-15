var error = require('../libs/Error');

module.exports = function (req,res,next) {
    if (!req.session.passport) {
        return next(new error('middleware',"NO_AUTH",401)); //status 401
    }
    next();
};