import UserModel from '../../models/userSchema.mjs';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d"});
}

export const getAll = (req, res) => {
  res.status(200).send('Welcome to Chat Application');
}

export const register = async (req, res) => {
  const { displayName, email, password } = req.body;
  try {
    let user = await UserModel.findOne({email});

    if(user) throw new Error('User already registered')
    if(!displayName || !email || !password) throw new Error('All fields are required')
    if(!validator.isEmail(email)) throw new Error('Email must be a valid email...')
    if(!validator.isStrongPassword(password)) throw new Error('Password must be a strong password')

    user = new UserModel({ displayName, email, password});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save(); 

  } catch (error) {
    res.status(500).send(error.message);
  }
}