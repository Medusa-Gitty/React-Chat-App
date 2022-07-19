const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("Yays");
  })
  .post(userController.registerUser);
// router.route("/login", authUser)

module.exports = router;
