import axios from "axios";

const instance = axios.create({
  baseURL: "https://Woodenculture.in/api/",
  withCredentials: true,
});

export default instance;
