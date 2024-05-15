//SignUpSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, loginUser, signupUser } from "../asyncThunkFunctions/asyncThunkFunctions";

export const authSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
        user: null,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: null
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserData.pending, (state) => {
            state.isFetching = true;
            state.isError = false;
        })
        .addCase(fetchUserData.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.user = payload.user;
            state.token = payload.token;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        })
        .addCase(fetchUserData.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message
        })
            .addCase(signupUser.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(signupUser.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.user = payload.user;
                state.token = payload.token;
                state.isFetching = false;
                state.isSuccess = true;
                return state;
            })
            .addCase(signupUser.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                state.errorMessage = payload.message
            })
            .addCase(loginUser.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                state.isFetching = false;
                state.isSuccess = true;
                return state;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                state.errorMessage = payload.message
            })
            
    }
});

export const { clearState } = authSlice.actions;

export const authSelector = (state) => state.user;
export default authSlice.reducer;