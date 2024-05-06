import { model, Schema} from 'mongoose';

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  }
}, { timestamps: true });

export const UserModel = model('user', UserSchema);