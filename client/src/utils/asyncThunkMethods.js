import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './api-client';


export const registerUserAsync = createAsyncThunk(
  'user/register',
  async (userData) => {
    const response = await registerUser(userData);
    return response;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (userData) => {
    const response = await loginUser(userData);
    return response;
  }
);
