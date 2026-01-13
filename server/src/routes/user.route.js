const { Router } = require("express");
const { registerUser, login } = require("../controller/user.controller");

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", login);

module.exports = userRouter;
