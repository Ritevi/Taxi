const OAuth2Strategy = require('passport-oauth2').Strategy;
var passport = require('passport');
const User = require('../models/User').User;
const config = require('../config');
const axios = require('axios').default;

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://oauth.vk.com/authorize',
        tokenURL: 'https://oauth.vk.com/access_token',
        clientID:     config.get("Auth:VKONTAKTE_APP_ID"), // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientSecret: config.get("Auth:VKONTAKTE_APP_SECRET"),
        callbackURL:  "http://localhost:3000/auth/vkontakte/callback"
    },
    function(accessToken, refreshToken, params, profile, done) {
        let MethodName = "";
        let V = '';
        axios.get(`https://api.vk.com/method/${MethodName}?PARAMETERS&access_token=${accessToken}&v=5.103`).then((res)=>{
            console.log(res);
        })
        // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));

module.exports = passport;