var User = require('../../models/User').User;
const error = require('../../libs/Error');
const AuthService = require("../../libs/AuthService");

exports.get = function (req,res) {
    res.render('register');
};


exports.post = function (req,res,next) {
    const password = req.body.password || '';
    const email = req.body.email || '';
    const username = req.body.username || '';
    User.Registration(username,password,email)
        .then((user)=>{
            if(user){
                res.json({user:{...user.getJSON(),token:AuthService.generateToken(user.getJSON())}});
            } else {
                next(new error("AuthError","REGISTRATION").toJSON());
            }
        })
        .catch((err)=>{
            next(err);
        })
};