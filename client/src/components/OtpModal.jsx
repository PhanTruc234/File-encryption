import { useState } from "react";

export default function OtpModal({ fileId, onVerify, onClose }) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async () => {
        if (!otp) {
            setError("Vui lòng nhập mã OTP");
            return;
        }
        setError("");
        setLoading(true);
        try {
            // Trim OTP khi gửi
            const trimmedOtp = otp.trim();
            console.log("Sending OTP:", trimmedOtp);
            const result = await onVerify(trimmedOtp);
            console.log("OTP verification result:", result);

            if (result && !result.ok) {
                setError(result.message || "OTP không đúng");
                setLoading(false);
                return;
            }
        } catch (err) {
            console.error("Error in OTP verification:", err);
            setError(err.response?.data?.message || err.message || "Xác thực OTP thất bại");
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
                    <h2 className="text-2xl font-bold text-gray-800">Xác nhận OTP</h2>
                    <p className="text-gray-600 text-sm mt-2">
                        Mã OTP đã được gửi đến email của bạn
                    </p>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nhập mã 6 chữ số</label>
                    <input
                        type="text"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => {
                            const value = e.target.value.slice(0, 6).replace(/\D/g, '');
                            setOtp(value);
                            setError("");
                        }}
                        onKeyPress={handleKeyPress}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg text-center text-4xl tracking-widest font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
                        maxLength="6"
                        disabled={loading}
                        autoFocus
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            {error}
                        </p>
                    )}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 bg-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleVerify}
                        disabled={loading || otp.length !== 6}
                        className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin"></span>
                                Đang xác nhận...
                            </>
                        ) : (
                            <>
                                Xác nhận
                            </>
                        )}
                    </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                    Mã OTP hết hạn sau 15 phút
                </p>
            </div>
        </div>
    );
}
