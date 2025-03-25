import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    username: null,
    email: null,
    image: null,
    role: null,
    loading: false,
    error: false,
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.username = action.payload?.username;
            state.role = action.payload?.role;
            state.loading = false;
            state.email = action.payload?.email;
            state.image = action.payload?.image;
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logoutUser: (state) => {
            state.username = null;
            state.email = null;
            state.image = null;
            state.role = null;
            state.loading = false;
            state.userId = null
        },
        loadingStart: (state) => {
            state.loading = true
        },
        loadingEnd: (state) => {
            state.loading = false;
        },
        updateUserState: (state, action) => {
            state.username = action.payload?.username;
            state.email = action.payload?.email;
            state.image = action.payload?.image;
        }

    }
});

export const { loginStart, loginSuccess, loginFailure, logoutUser, loadingStart, loadingEnd, updateUserState } = userSlice.actions;

export default userSlice.reducer;

