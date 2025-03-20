import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    role:null,
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
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logoutUser: (state) => {
            state.username = null;
            state.loading = false;
        }
        
    }
});

export const {loginStart, loginSuccess, loginFailure, logoutUser} = userSlice.actions;

export default userSlice.reducer;

