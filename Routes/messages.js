const express = require("express");
const { Authorization } = require("../middleware/Authorization");

const messagesRouter = express.Router();

const {
  httpGetAllMessages,
  httpCreateMessage,
} = require("../Controller/messages.controller");

messagesRouter.post("/get-all-messages", Authorization, httpGetAllMessages);
messagesRouter.post("/create-new-message", Authorization, httpCreateMessage);

module.exports = { messagesRouter };
