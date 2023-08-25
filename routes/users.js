var express = require("express");
var userRouter = express.Router();

const { userDetails, userLogin, assetPurchasing } = require("../controller/userController");

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

userRouter.post("/userDetails", userDetails);
userRouter.post("/login", userLogin);
userRouter.post("/assetPurchasing", assetPurchasing);

module.exports = userRouter;
