import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret';
const refreshSecret = 'your_jwt_refresh_secret';

export const createToken = (userId) => {
  return jwt.sign({ userId }, secret, { expiresIn: '15m' });
};

export const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshSecret, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, refreshSecret);
  } catch (e) {
    return null;
  }
};
