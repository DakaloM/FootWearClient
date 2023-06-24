import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        currentUser : null,
        isFetching: false,
        error: false,
       
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
        },
        updateUser: (state, action) => {
            const {accessToken, ...others} = state.currentUser;
           state.currentUser = {accessToken, ...action.payload}
        }
        
    }
})

export const {loginStart, loginSuccess, loginFailure, logout, updateUser} = userSlice.actions;
export default userSlice.reducer