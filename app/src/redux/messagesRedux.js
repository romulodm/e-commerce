import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    errorMessage: "",
    showMessage: false,
    showSuccess: false
  },
  reducers: {
    setMessage: (state, action) => {
        state.errorMessage = action.payload;
        state.showMessage = true
    },
    resetMessage: (state) => {
        state.errorMessage = "";
        state.showMessage = false
    },
    setSuccess: (state) => {
      state.showSuccess = true
    },
    resetSuccess: (state) => {
      state.showSuccess = false
    }
  }
});

export const { setMessage, resetMessage, setSuccess, resetSuccess } = messagesSlice.actions;
export default messagesSlice.reducer;