import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  chatId: String,
  senderId: String,
  text: String,
}, 
{ timestamps: true }
);

export const MessageModel = model('Message', MessageSchema);