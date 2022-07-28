const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const auth = require("../middlewares/authMiddleware");

router.route("/").post(auth, messageController.sendMessage);
router.route("/:chatId").get(auth, messageController.allMessages);

module.exports = router;
