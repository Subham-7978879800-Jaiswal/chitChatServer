const mongoose = require("mongoose");
const { chatModel } = require("./chat.model");
const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
      required: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("messages", messageSchema);

const getAllMessagesFromChatId = async (chatId) => {
  try {
    const messages = await messageModel
      .find({
        chatId: chatId,
      })
      .select({
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      });
    return { success: true, messages: messages };
  } catch (err) {
    return { success: false, errorMessage: "Something went wrong" };
  }
};

const createMessage = async (chatId, senderId, text) => {
  try {
    const newMessage = new messageModel({ chatId, senderId, text });
    const message = await newMessage.save();
     await chatModel.findOneAndUpdate(
       { _id: chatId },
       {
         lastMessage: message._id,
         $inc: { unreadMessages: 1 },
       }
     );
    return { success: true, message };
  } catch (err) {
    return {
      success: false,
      errorMessage: "Something went wrong. Please Try again later",
    };
  }
};

module.exports = { getAllMessagesFromChatId, createMessage };
