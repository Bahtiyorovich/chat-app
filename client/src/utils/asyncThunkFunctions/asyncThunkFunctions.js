import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCookie, setCookie } from "../../api/api";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token, thunkAPI) => {
      try {
          const response = await axios.get(`http://localhost:8000/api/user/${token}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message)
        } else {
          return thunkAPI.rejectWithValue(error.message)
        }
      }
  }
);

export const signupUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, thunkAPI) => {
      try {
          let link = "http://localhost:8000/api/register";
          const params = {
              email: email,
              name: name,
              password: password
          };
          const response = await axios.post(link, params, {
              headers: { "Content-Type": "application/json" }
          });
          let data = await response.data;
          if (response.status === 200) {
              setCookie("token", data.token, 1);
              console.log(data)
              return data;

          }else {
              return thunkAPI.rejectWithValue(data)
          }
      } catch (e) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message)
        } else {
          return thunkAPI.rejectWithValue(error.message)
        }
      }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
      try {
          const params = {
              email: email,
              password: password
          };
          let link = "http://localhost:8000/api/login";
          const response = await axios.post(link, params, {
              headers: { "Content-Type": "application/json" }
          });
          let data = await response.data;
          if (response.status === 200) {
              setCookie("token", data.token, 1);
              return data;
          }
      } catch (e) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message)
        } else {
          return thunkAPI.rejectWithValue(error.message)
        }
      }
  }
);

export const logoutUser = () => (dispatch) => {
  try {
      deleteCookie("token");
      window.location.reload();
  } catch (error) {
      throw new Error('Error: ' + error.message)
  }
};