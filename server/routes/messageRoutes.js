const express = require("express");
const messageController = require("../controllers/messageController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(auth, messageController.sendMessage);
router.route("/:chatId").get(auth, messageController.allMessages);

module.exports = router;
