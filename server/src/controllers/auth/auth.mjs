import { UserModel } from '../../models/userSchema.mjs';
import validator from 'validator';
import { comparePassword, createToken, hashedPassword } from '../../utils/helpers.mjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users.length) {
      return res.status(400).json('No users found');
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json('Error: ' + error.message);
  }
};

export const findUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(400).json('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Error: ' + error.message);
  }
};

export const register = async (req, res) => {
  const { displayName, email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json('User already registered');
    }
    if (!displayName || !email || !password) {
      return res.status(400).json('All fields are required');
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json('Email must be a valid email');
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json('Password must be a strong password');
    }

    const hashPass = hashedPassword(password);
    user = new UserModel({ displayName, email, password: hashPass });

    await user.save();
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, displayName, email, token });
  } catch (error) {
    res.status(500).json('Error: ' + error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json('User not found');
    }
    const isValidPass = comparePassword(password, user.password);
    if (!isValidPass) {
      return res.status(400).json('Invalid email or password');
    }
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.displayName, email, token });
  } catch (error) {
    res.status(500).json('Error: ' + error.message);
  }
};
