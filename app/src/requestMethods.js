import axios from "axios";

const BASE_URL = "http://localhost:5000/rep-api/";

//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjowLCJpYXQiOjE2ODQ2MDk5OTIsImV4cCI6MTY4NDg2OTE5Mn0.Au__Zg4yzmsyKlPMDJ_0EDoKGFenR8z3g4JD1bSPkH4"

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});