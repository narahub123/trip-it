import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

const refreshAPIForNode = axios.create({
  baseURL: `${baseURL}/reissue`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
