import { useState } from "react";
import { useFileStore } from "../store/fileStore";

export default function PasswordModal({ fileId, onClose }) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { requestDownloadOtp, verifyPassword } = useFileStore();

    const handleVerify = async () => {
        if (!password) {
            setError("Vui lòng nhập mật khẩu");
            return;
        }
        setError("");
        setLoading(true);
        try {
            // Kiểm tra mật khẩu có đúng không
            console.log("Verifying password for file:", fileId);
            const result = await verifyPassword(fileId, password);
            console.log("Verify result:", result);

            if (!result.ok) {
                setError(result.message || "Mật khẩu không đúng");
                setLoading(false);
                return;
            }

            // Nếu mật khẩu đúng, lưu và gửi OTP
            window.downloadPassword = password;
            await requestDownloadOtp(fileId);
            onClose();
        } catch (err) {
            console.error("Error:", err);
            setError("Lỗi khi xác nhận: " + err.message);
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !loading) {
            handleVerify();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 transform transition">
                <div className="text-center mb-6">
                    <div className="text-5xl mb-3"></div>
                    <h2 className="text-2xl font-bold text-gray-800">Nhập Mật Khẩu</h2>
                    <p className="text-gray-600 text-sm mt-2">
                        Nhập mật khẩu để giải mã tệp
                    </p>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                        autoFocus
                        disabled={loading}
                    />
                </div>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                        ✗ {error}
                    </div>
                )}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? "Đang kiểm tra..." : "Tiếp tục"}
                    </button>
                </div>
            </div>
        </div>
    );
}
