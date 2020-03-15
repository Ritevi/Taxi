var User = require('../../models/User').User;
const error = require('../../libs/Error');

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
                req.session.passport = {user};
                res.status(200);
                res.send();
            } else {
                next(new error("AuthError","REGISTRATION"));
            }
        })
        .catch((err)=>{
            next(err);
        })
};