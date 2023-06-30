import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
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
    setSucess: (state) => {
      state.sucess = true
    },
    resetSucess: (state) => {
      state.sucess = false
    }
  }
});

export const { setMsg, resetMsg, setSucess, resetSucess } = registerSlice.actions;
export default registerSlice.reducer;