import axios from "axios";
import {TOKEN_KEY} from "./constants";
// https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app
const api = axios.create({
    baseURL: "http://localhost:8080",
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export default api