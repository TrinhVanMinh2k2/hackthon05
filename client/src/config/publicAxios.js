import axios from "axios";

const baseURL = "http://localhost:8098";

const publicAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicAxios;
