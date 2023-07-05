const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { run } = require("./db");

const { userRouter } = require("./Routes/user");
const { chatRouter } = require("./Routes/chat");
const { messagesRouter } = require("./Routes/messages");
require("dotenv").config();

const app = express();

const { FE_URL } = process.env;

app.use(cors({ credentials: true, origin: FE_URL }));
app.use(helmet());
app.use(express.json());
app.use("/users", userRouter);
app.use("/chat", chatRouter);
app.use("/messages", messagesRouter);

const { port } = process.env || 4000;

app.listen(port, async () => {
  await run();

  console.log(`Start listening server at Port ${port}`);
});
