const mongoose = require("mongoose");

const chat = new mongoose.Schema(
  {
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      ],
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
    },
    unreadMessages: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("chats", chat);

const getAllChatForUser = async (id) => {
  try {
    const projection = {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    };
    const allChats = await chatModel
      .find({ members: { $in: [id] } })
      .select(projection);
    return { success: true, chats: allChats };
  } catch (err) {
    return { success: false, errorMessage: err.toString() };
  }
};

const createChat = async (id, members, lastMessage, unreadMessages) => {
  try {
    const createdChat = new chatModel({
      members,
      lastMessage,
      unreadMessages,
    });
    const response = await createdChat.save();
    // const { chats } = await getAllChatForUser(id);
    return { success: true, message: "Chat Created :)", chat: response };
  } catch (err) {
    return { success: false, errorMessage: err.toString() };
  }
};

module.exports = { createChat, getAllChatForUser };
