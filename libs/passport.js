const VKontakteStrategy = require('passport-vkontakte').Strategy;
var passport = require('passport');
const User = require('../models/User').User;
const config = require('../config');


passport.serializeUser(function(req,user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new VKontakteStrategy(config.get("VKontakteStrategy"),
    function(accessToken, refreshToken, params, profile, done) {
        User.findOrCreateByVK(profile)
            .then((user)=>{
                let {vkId,displayName,id}=user;
                done(null,{vkId,displayName,id});
            })
            .catch((err)=>{
                done(err,null);
            })
    }
));


module.exports = passport;