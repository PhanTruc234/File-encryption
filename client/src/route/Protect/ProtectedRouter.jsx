import { Navigate, Outlet } from "react-router-dom";
import { UserAuthStore } from "../../store/userAuthStore";

export const ProtectedRouter = () => {
    const token = UserAuthStore((s) => s.accessToken);
    // const isInitialized = UserAuthStore((s) => s.isInitialized);

    // if (!isInitialized) {
    //     return <div className="flex items-center justify-center h-screen">Đang kiểm tra đăng nhập...</div>;
    // }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
