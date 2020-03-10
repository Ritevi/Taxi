var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/checkAuth')

/* GET home page. */
router.get('',require('../controllers/frontpage').get);

router.get('/chat',checkAuth,require('../controllers/chat').get);

module.exports = router;
