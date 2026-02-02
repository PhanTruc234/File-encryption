import axios from "axios";
import { UserAuthStore } from "../store/userAuthStore";
const axiosClient = axios.create({
    baseURL:
        import.meta.env.MODE === "development" ? "http://localhost:4000/" : "",
    withCredentials: true,
});
axiosClient.interceptors.request.use((config) => {
    const { accessToken } = UserAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});
axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (
            originalRequest.url.includes("/api/sign-in") ||
            originalRequest.url.includes("/api/sign-up") ||
            originalRequest.url.includes("/api/refresh")
        ) {
            return Promise.reject(error);
        }
        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                const res = await axiosClient.post("/api/refresh");

                const newAccessToken = res.data.data.accessToken;
                UserAuthStore.getState().setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosClient(originalRequest);
            } catch (refreshError) {
                UserAuthStore.getState().clearState();
                console.log("REFRESH FAIL — LOGOUT USER");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default axiosClient;