const express = require("express");
const { Authorization } = require("../middleware/Authorization");

const chatRouter = express.Router();

const {
  httpGetAllChats,
  httpCreateChat,
} = require("../Controller/chat.controller");

chatRouter.get("/get-all-chats", Authorization, httpGetAllChats);
chatRouter.post("/create-new-chat", Authorization, httpCreateChat);

module.exports = { chatRouter };
