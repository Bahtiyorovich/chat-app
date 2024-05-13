import { MessageModel } from "../models/messageSchema.mjs";

export const createMessage = async (req, res) => {
  const { chatId, jsonerId, text } = req.body;
  const message = new MessageModel({
    chatId, jsonerId, text
  })
  try {
    const response = await message.save();
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json(error.message)
  }
};

export const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const message = await MessageModel.find({ chatId });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error.message)
  }
};
