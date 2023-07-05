
const {getAllMessagesFromChatId,createMessage } = require("../Model/messages.model"); 


const httpGetAllMessages = async (req, res) => {
  const { chatId } = req.body;
  const { success, messages, errorMessage } = await getAllMessagesFromChatId(chatId);
  if (success) {
    res.status(200).send({ success, messages });
  } else {
    res.status(500).send({ success, errorMessage });
  }
};
const httpCreateMessage = async  (req, res) => {
  const { chatId, senderId, text } = req.body;
  const { success, message, errorMessage } = await createMessage(
    chatId,
    senderId,
    text
  );
  if (success) {
    res.status(200).send({ success, message });
  } else {
    res.status(500).send({ success, errorMessage });
  }
};

module.exports = { httpGetAllMessages, httpCreateMessage };
