const { createChat, getAllChatForUser } = require("../Model/chat.model");

const httpGetAllChats = async (req, res) => {
  const id = req._id;
  const { success, message, errorMessage, chats } = await getAllChatForUser(id);
  if (success) {
    res.status(200).json({ success: true, message: message, chats });
  } else {
    res.status(400).json({ success: true, message: errorMessage });
  }
};

const httpCreateChat = async (req, res) => {
  const { members, lastMessage, unreadMessages = 0 } = req.body;
  const { success, message, errorMessage, chat } = await createChat(
    req._id,
    members,
    lastMessage,
    unreadMessages
  );
  if (success) {
    res.status(200).json({ success: true, message: message, chat });
  } else {
    res.status(400).json({ success: true, message: errorMessage });
  }
};

module.exports = { httpGetAllChats, httpCreateChat };
