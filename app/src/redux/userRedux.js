import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: true,
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
    resetError: (state) => {
      state.error = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, resetError, logout } = userSlice.actions;
export default userSlice.reducer;