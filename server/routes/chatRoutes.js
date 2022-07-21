const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const chatController = require("../controllers/chatController");

router
  .route("/")
  .post(auth, chatController.accessChat)
  .get(auth, chatController.fetchChats);
router.route("/group").post(auth, chatController.createGroupChat);
router.route("/rename").put(auth, chatController.renameGroup);
router.route("/groupadd").put(auth, chatController.addToGroup);
router.route("/groupremove").put(auth, chatController.removeFromGroup);

module.exports = router;
