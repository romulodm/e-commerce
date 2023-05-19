import axios from "axios";

const BASE_URL = "http://localhost:5000/rep-api/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJpYXQiOjE2ODQ0NDI3NjksImV4cCI6MTY4NDcwMTk2OX0.co4ojCp1PNG6oDWHlNrCDCnmxsAxXmnQ_sQSBEcFsZo"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});