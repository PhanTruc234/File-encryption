import { Routes, Route } from "react-router-dom";

import { LayoutAccount } from "../../layout/LayoutAccount/LayoutAccount";
import FileList from "../../page/FileList/FileList";
import LoginPage from "../../page/login/LoginPage";
import SignupPage from "../../page/signup/SignupPage";
import ForgotPasswordPage from "../../page/ForgotPass/ForgotPasswordPage";
import ResetPasswordPage from "../../page/Reset/ResetPasswordPage";
import { ProtectedRouter } from "../Protect/ProtectedRouter";
import UploadForm from "../../page/upLoadForm/UploadForm";
import HomePage from "../../page/home/HomePage";

export const RouterAccount = () => {
    return (
        <Routes>
            <Route element={<LayoutAccount />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            <Route element={<ProtectedRouter />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    );
};
