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

passport.use(new VKontakteStrategy({
        clientID:     config.get("Auth:VKONTAKTE_APP_ID"), // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientSecret: config.get("Auth:VKONTAKTE_APP_SECRET"),
        callbackURL:  "http://localhost:3000/auth/vkontakte/callback"
    },
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