import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = async (user) => {
  try {
    const res = await publicRequest.post("/auth/register", user);
    return true
  } catch (err) {
    return false
  }
};

export const checkEmail = async (email) => {
  try {
    const res = await publicRequest.post("/auth/check-email", email);
    return res
  } catch (err) {
    return err.response
  }
};

export const confirmationEmail = async (user) => {
  try {
    const res = await publicRequest.post("/email/confirmation", user);
    return true
  } catch (err) {
    return false
  }
};

export const codeEmail = async (content) => {
  try {
    await publicRequest.post("/email/send-code", content);
    return true
  } catch (err) {
    return false
  }
};