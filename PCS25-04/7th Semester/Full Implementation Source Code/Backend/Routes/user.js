const express = require("express");
const { GetUserInfo, UpdateUserInfo } = require("../Controllers");
const {
  userAuthMiddleware,
  userInfoUpdateInputValidation,
} = require("../Middlewares/user");

const userRouter = express.Router();

userRouter.get("/info", userAuthMiddleware, GetUserInfo);
userRouter.put(
  "/update",
  userAuthMiddleware,
  userInfoUpdateInputValidation,
  UpdateUserInfo
);
module.exports = userRouter;
