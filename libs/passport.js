const VKontakteStrategy = require('passport-vkontakte').Strategy;
var passport = require('passport');
const User = require('../models/User').User;
const config = require('../config');

passport.use(new VKontakteStrategy({
        clientID:     config.get("Auth:VKONTAKTE_APP_ID"), // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientSecret: config.get("Auth:VKONTAKTE_APP_SECRET"),
        callbackURL:  "http://localhost:3000/auth/vkontakte/callback"
    },
    function(accessToken, refreshToken, params, profile, done) {
        console.log(params,profile); // getting the email
        // User.findOrCreate({ vkontakteId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
    }
));

module.exports = passport;