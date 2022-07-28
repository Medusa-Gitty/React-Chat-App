const express = require("express");
const messageController = require("../controllers/messageController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(auth, messageController.sendMessage);
// router.route("/:chatId").get(protect, allMessagesController);

module.exports = router;
