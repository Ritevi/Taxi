var express = require('express');
var router = express.Router();
const RoomController = require('../controllers/Room');
const RoomUserController = require('../controllers/Room/User');
const AuthService = require('../libs/AuthService');



router.get("/room/:roomId",RoomController.get);
router.post("/room",RoomController.post);
router.delete("/room/:roomId",RoomController.delete);

router.post("room/:roomId/user/:userId",RoomUserController.post);


module.exports = router;