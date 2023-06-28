const express = require("express");
const {Authorization} = require("../middleware/Authorization")

const userRouter = express.Router();

const {
  httpLogin,
  httpRegister,
  httpGetUserFromEmailId,
  httpAllUserExceptCurrentUser,
} = require("../Controller/user.controller");

userRouter.post("/login", httpLogin);
userRouter.post("/register", httpRegister);
userRouter.get("", Authorization , httpGetUserFromEmailId);
userRouter.get(
  "/allUserExceptCurrentUser",
  Authorization,
  httpAllUserExceptCurrentUser
);
module.exports = { userRouter };
