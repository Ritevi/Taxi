const User = require('../../models/User').User;
const error = require('../../libs/Error');
const AuthService = require("../../libs/AuthService");

exports.post = function (req,res,next) {
    const password = req.body.password || '';
    const email = req.body.email || '';
    User.login(email,password)
        .then((user)=>{
            if(user){
                res.json({user:{...user.getJSON(),token:AuthService.generateToken(user.getJSON())}})
            } else {
                next(new error('AuthError',"NO_USER").toJSON());
            }
        })
        .catch((err)=>{
            next(err);
        })

};