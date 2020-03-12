var express = require('express');
var router = express.Router();
var passport = require('../libs/passport');

router.get('/register',require('../controllers/registration').get);
router.post('/register',require('../controllers/registration').post);

router.post('/logout',require('../controllers/logout').post);

router.post('/login',require('../controllers/login').post);

router.get('/auth/vkontakte',
    passport.authenticate('oauth2',{response_type:"code",state:"sosat"}),
    function(req, res){
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });

router.get('/auth/vkontakte/callback',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;