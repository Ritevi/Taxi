var express = require('express');
var router = express.Router();
var passport = require('passport');
const AuthService = require('../libs/AuthService');

router.post('/register',require('../controllers/Auth/registration').post);

router.post('/login',require('../controllers/Auth/login').post);

router.get('/auth/vkontakte',
    passport.authenticate('vkontakte'),
    function(req, res){
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    });

router.get('/auth/vkontakte/callback*',
    passport.authenticate('vkontakte', { failureRedirect: '/login',session:false}),
    function(req, res) {
        res.json({user:{
                ...req.user,
                token:AuthService.generateToken(req.user)
            }});
    });

module.exports = router;
