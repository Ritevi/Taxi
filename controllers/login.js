const User = require('../models/User').User;
const error = require('../libs/Error');

exports.post = function (req,res,next) {
    const password = req.body.password || '';
    const email = req.body.email || '';
    User.login(email,password)
        .then((user)=>{
            if(user){
                req.session.passport.user = user;
                res.status = 200;
                res.send();
            } else {
                next(new error('AuthError',"NO_USER"));
            }
        })
        .catch((err)=>{
            next(err);
        })

};