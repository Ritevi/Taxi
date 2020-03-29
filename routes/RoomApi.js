const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/Room/Room");
const RoomIdController = require("../controllers/Room/RoomId");
const RoomIdUserController = require("../controllers/Room/RoomIdUser");
const RoomIdUserIdController = require("../controllers/Room/RoomIdUserId");
const RoomIdSubscriberController = require("../controllers/Room/RoomIdSubscriber");
const RoomIdSubscriberIdController = require("../controllers/Room/RoomIdSubscriberId");
const RoomIdOwnerController = require("../controllers/Room/RoomIdOwner");
const isOwner = require("../middleware/isOwner");

router.get("/room", RoomController.get);
router.post("/room", RoomController.post);

router.get("/room/:roomId", RoomIdController.get);
router.delete("/room/:roomId", isOwner, RoomIdController.delete);

router.post("/room/:roomId/user", isOwner, RoomIdUserController.post);
router.delete(
  "/room/:roomId/user/:userId",
  isOwner,
  RoomIdUserIdController.delete
);

router.post(
  "/room/:roomId/subscriber",
  isOwner,
  RoomIdSubscriberController.post
);
router.get("/room/:roomId/subscriber", RoomIdSubscriberController.get);
router.delete(
  "/room/:roomId/subscriber/:userId",
  isOwner,
  RoomIdSubscriberIdController.delete
);

router.post("/room/:roomId/owner", isOwner, RoomIdOwnerController.post);
router.get("/room/:roomId/owner", RoomIdOwnerController.get);
module.exports = router;
