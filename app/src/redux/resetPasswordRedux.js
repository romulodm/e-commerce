import { createSlice } from "@reduxjs/toolkit";

const resetPasswordSlice = createSlice({
  name: "resetpassword",
  initialState: {
    errorMsg: "",
    showMsg: false,
    sucess: false
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
    setSucess: (state, action) => {
      state.sucess = true
    },
    resetSucess: (state) => {
      state.sucess = false
    }
  }
});

export const { setMsg, resetMsg, setSucess, resetSucess } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;