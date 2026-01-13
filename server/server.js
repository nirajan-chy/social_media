const express = require("express");
const { testPostgresConnection } = require("./src/config/database");
const userRouter = require("./src/routes/user.route");
const postRouter = require("./src/routes/post.route");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
testPostgresConnection();

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
