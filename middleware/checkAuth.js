var error = require('../libs/Error');
const AuthService = require('../libs/AuthService');

module.exports = function (req,res,next) {
    if (!req.headers.authorization&&AuthService.verifyToken(req.headers.authorization)) {
        return next(new error('middleware',"NO_AUTH",401).toJSON()); //status 401
    }
    next();
};