import axios from "axios";

const API = axios.create({
baseURL: "[http://localhost:5000](http://localhost:5000)", // backend server URL
});

// Register API call
export const registerUser = (data) => API.post("/api/auth/register", data);

// Login API call
export const loginUser = (data) => API.post("/api/auth/login", data);
