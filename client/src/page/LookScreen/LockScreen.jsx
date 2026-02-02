export default function LockScreen({ onUnlock }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce"></div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Ứng dụng bị khóa
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    Do bạn không hoạt động quá lâu
                </p>
                <button
                    onClick={onUnlock}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-lg hover:shadow-2xl hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 text-lg"
                >
                    Mở khóa ứng dụng
                </button>
            </div>
        </div>
    );
}
