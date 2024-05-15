import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "../utils/authSlices/authSlice";

const store = configureStore({
    reducer: {
        user: authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
});

export default store;
