import { env } from "@/env";
import { useAuthStore } from "@/stores/userStore";
import axios from "axios";

const api = axios.create({
    baseURL: env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => Promise.reject(error)
)

export default api;