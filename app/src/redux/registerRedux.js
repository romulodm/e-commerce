import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    code: false,
    errorMsg: "",
    showMsg: false,
  },
  reducers: {
    setCode: (state, action) => {
        state.code = action.payload;
    },
    resetCode: (state) => {
        state.code = false;
    },
    setMsg: (state, action) => {
        state.errorMsg = action.payload;
        state.showMsg = true
    },
    resetMsg: (state) => {
        state.errorMsg = "";
        state.showMsg = false
    }
  },
});

export const { setCode, resetCode, setMsg, resetMsg } = registerSlice.actions;
export default registerSlice.reducer;