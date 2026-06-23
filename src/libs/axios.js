import axios from "axios"

export const axiosInstance = axios.create({
     baseURL: "http://localhost:5000/api",
    // baseURL: "https://e-commerce-backend-sysmatixx-1.onrender.com/api",
    withCredentials: true,
});