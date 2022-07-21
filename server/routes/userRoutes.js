const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(userController.registerUser)
  .get(auth, userController.allUsers);
router.route("/login").post(userController.authUser);

module.exports = router;
