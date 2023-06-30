import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    errorMsg: "",
    showMsg: false,
  },
  reducers: {
    setMsg: (state, action) => {
      state.errorMsg = action.payload;
      state.showMsg = true
    },
    resetMsg: (state) => {
      state.errorMsg = "";
      state.showMsg = false
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, resetError, logout } = userSlice.actions;
export default userSlice.reducer;