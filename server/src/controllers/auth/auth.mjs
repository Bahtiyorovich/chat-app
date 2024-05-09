import {UserModel }from '../../models/userSchema.mjs';
import validator from 'validator';
import { comparePassword, createToken, hashedPassword } from '../../utils/helpers.mjs';


export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    if(!users) res.status(400).json('No users found')
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
  res.status(200).send('Welcome to Chat Application');
}

export const findUser = async ( req, res ) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if(!user) res.status(400).json('User not found');
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const register = async (req, res) => {
  const { displayName, email, password } = req.body;
  try {
    let user = await UserModel.findOne({email});

    if(user) res.status(400).json('User already registered')
    if(!displayName || !email || !password) res.status(400).json('All fields are required')
    if(!validator.isEmail(email)) res.status(400).json('Email must be a valid email...')
    if(!validator.isStrongPassword(password)) res.status(400).json('Password must be a strong password')

    let hashPass = hashedPassword(password)
    user = new UserModel({ displayName, email, password: hashPass});
    
    await user.save(); 
    const token = createToken(user._id)

    res.status(200).send({_id: user._id, displayName, email,  token});
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if(!user) res.status(400).json('Invalid email or password...');

    let isValidPass = comparePassword(password, user.password);
    if(!isValidPass) res.status(400).json('Invalid email or password...'); 
    const token = createToken(user._id);

    res.status(200).send({ _id: user._id, name: user.displayName, email, token: token });
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
}

export const logout = async (req, res) => {

}