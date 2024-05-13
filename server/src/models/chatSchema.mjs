import { Schema, model } from 'mongoose';

const ChatSchema = new Schema(
  {
    members: Array
  },
  {
    timestamps: true
  }
);

export const ChatModel = model('chat', ChatSchema);