const VKontakteStrategy = require('passport-vkontakte').Strategy;
var passport = require('passport');
const User = require('../models/User').User;
const config = require('../config');




passport.use(new VKontakteStrategy(config.get("VKontakteStrategy"),
    function(accessToken, refreshToken, params, profile, done) {
        User.findOrCreateByVK(profile)
            .then((user)=>{
                done(null,user.getJSON());
            })
            .catch((err)=>{
                done(err,null);
            })
    }
));


module.exports = passport;