var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/checkAuth')


router.get('',require('../controllers/frontpage').get);

router.get('/chat',checkAuth,require('../controllers/Room/chat').get);

module.exports = router;
