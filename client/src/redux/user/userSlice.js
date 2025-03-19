import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
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
            state.currentUser = action.payload;
            state.loading = false;
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logoutUser: (state) => {
            state.currentUser = null;
        }
        
    }
});

export const {loginStart, loginSuccess, loginFailure, logoutUser} = userSlice.actions;

export default userSlice.reducer;

