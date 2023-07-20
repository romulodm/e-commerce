import { publicRequest, adminRequest } from "./requestMethods"

export const login = async (user) => {
  try {
    const res = publicRequest.post("/auth/login", user);
    return res
  } catch (err) {
    return err
  }
};

export const registerUser = async (user) => {
  try {
    const res = await publicRequest.post("/auth/register", user);
    return res
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
    return res
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

export const resetPasswordEmail = async (content) => {
  try {
    await publicRequest.post("/email/send-resetPassword", content);
    return true
  } catch (err) {
    return false
  }
};

export const modifyPassword = async (content) => {
  try {
    const res = await publicRequest.post("/auth/reset-password", content);
    return res
  } catch (err) {
    return false
  }
};

export const getUsers = async () => {
  try {
    const res = await adminRequest.get("/user/find-all");
    return res
  } catch (err) {
    return false
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await adminRequest.delete(`/user/delete/${id}`);
    return res
  } catch (err) {
    return false
  }
};