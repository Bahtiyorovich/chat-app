import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createToken = (id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ id }, jwtkey, { expiresIn: "3d"});
}

export const hashedPassword = (pass) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
}

export const comparePassword = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
}