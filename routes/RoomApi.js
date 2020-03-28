const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/Room/Room");
const RoomIdController = require("../controllers/Room/RoomId");
const RoomIdUserController = require("../controllers/Room/RoomIdUser");
const RoomIdUserIdController = require("../controllers/Room/RoomIdUserId");
const RoomIdSubscriberController = require("../controllers/Room/RoomIdSubscriber");
const RoomIdSubscriberIdController = require("../controllers/Room/RoomIdSubscriberId");
const AuthService = require("../libs/AuthService");

router.get("/room", RoomController.get);
router.post("/room", RoomController.post);

router.get("/room/:roomId", RoomIdController.get);
router.delete("/room/:roomId", RoomIdController.delete);

router.post("/room/:roomId/user", RoomIdUserController.post);
router.delete("/room/:roomId/user/:userId", RoomIdUserIdController.delete);

router.post("/room/:roomId/subscriber", RoomIdSubscriberController.post);
router.delete(
  "/room/:roomId/subscriber/:userId",
  RoomIdSubscriberIdController.delete
);

module.exports = router;
