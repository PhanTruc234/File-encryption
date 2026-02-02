import { create } from "zustand";
import { userService } from "../service/user/userService";

export const UserAuthStore = create((set, get) => ({
    accessToken: null,
    user: (() => {
        const userStr = localStorage.getItem("userLottery")
        return userStr ? JSON.parse(userStr) : null;
    })(),
    loading: false,
    isInitialized: false,

    setAccessToken: (accessToken) => {
        set({ accessToken });
    },

    // initializeAuth: async () => {
    //     try {
    //         const savedToken = localStorage.getItem("token");
    //         const savedUser = localStorage.getItem("userLottery");

    //         if (savedToken && savedUser) {
    //             set({ accessToken: savedToken, user: JSON.parse(savedUser) });
    //             try {
    //                 const res = await userService.refreshToken();
    //                 if (res?.data?.data?.accessToken) {
    //                     set({ accessToken: res.data.data.accessToken });
    //                     localStorage.setItem("token", res.data.data.accessToken);
    //                 }
    //             } catch (refreshError) {
    //                 get().clearState();
    //             }
    //         }
    //     } finally {
    //         set({ isInitialized: true });
    //     }
    // },

    clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        localStorage.removeItem("token");
        localStorage.removeItem("userLottery");
    },
    signUp: async (fullName, email, password, captchaToken) => {
        try {
            set({ loading: true });
            const res = await userService.signUp(fullName, email, password, captchaToken)
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false })
        }
    },
    login: async (email, password, captchaToken) => {
        try {
            set({ loading: true });
            const res = await userService.login(email, password, captchaToken)
            if (res?.status === 200) {
                const { token, user } = res.data;
                console.log(token, user, "mdvkmkmfkbmf")
                console.log(res, "kkykokjukjuo")
                set({ accessToken: token });
                localStorage.setItem("token", token);
                localStorage.setItem("userLottery", JSON.stringify(user));
            }
            console.log(res, "resresresres")
            return res;
        } finally {
            set({ loading: false });
        }
    },
    logout: async () => {
        try {
            await userService.logout();
            get().clearState();
            window.location.href = "/login";
        } catch (error) {
            console.log(error);
            get().clearState();
            window.location.href = "/login";
        }
    },
    forgotPassword: async (email, captchaToken) => {
        try {
            set({ loading: true });
            return await userService.forgotPassword(email, captchaToken);
        } finally {
            set({ loading: false });
        }
    },
    resetPassword: async (otp, newPassword, captchaToken) => {
        try {
            set({ loading: true });
            return await userService.resetPassword(otp, newPassword, captchaToken);
        } finally {
            set({ loading: false });
        }
    },
}))