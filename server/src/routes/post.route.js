const { Router } = require("express");
const { createPost } = require("../controller/post.controller");

const postRouter = Router();

postRouter.post("/create", createPost);

module.exports = postRouter;
