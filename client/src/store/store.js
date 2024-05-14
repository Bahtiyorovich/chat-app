import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../utils/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // Boshqa reducerlar ham bo'lsa ularni ham qo'shing
    // Masalan: someFeature: someReducer,
  },
});

export default store;
