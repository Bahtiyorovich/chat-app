import { ChatModel } from "../models/chatSchema.mjs";

export const createChat = async (req, res) => {
  
  const { firstId, secondId } = req.body;
  
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId]}
    });

    if(chat) res.status(200).json(chat);

    const newChat = await ChatModel({
      members: [firstId, secondId]
    });
    const response = await newChat.save();

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json( error.message );
  }
}

export const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    
    const chats = await ChatModel.find({
      members: { $in: [userId]}
    });

    res.status(200).json(chats)

  } catch (error) {
      res.status(500).json( error.message );
  }
}

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await ChatModel.find({
      members: { $all: [firstId, secondId]}
    });

    res.status(200).json(chat);

  } catch (error) {
    res.status(500).json(error.message);
  }
}