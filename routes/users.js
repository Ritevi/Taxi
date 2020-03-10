var express = require('express');
var router = express.Router();

router.get('/register',require('../controllers/registration').get);
router.post('/register',require('../controllers/registration').post);

router.post('/logout',require('../controllers/logout').post);

router.post('/login',require('../controllers/login').post);

module.exports = router;
