export default function UploadForm({ password, setPassword, onUpload, setFile, selectedFile, uploadMessage }) {
    return (
        <form className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200" onSubmit={onUpload}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-3"></span>
                Tải tệp mới
            </h2>

            <div className="space-y-5">
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer bg-blue-50">
                    <input
                        type="file"
                        onChange={e => setFile(e.target.files[0])}
                        className="w-full opacity-0 absolute cursor-pointer"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <div className="text-4xl mb-2"></div>
                        <p className="text-blue-600 font-semibold">Chọn tệp hoặc kéo thả</p>
                        <p className="text-gray-500 text-sm mt-1">Hỗ trợ tất cả các loại tệp</p>
                    </label>
                </div>

                {selectedFile && (
                    <div className="bg-blue-100 border border-blue-400 rounded-lg p-4 flex items-center gap-3">
                        <span className="text-2xl"></span>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800 truncate">{selectedFile.name}</p>
                            <p className="text-sm text-gray-600">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                    </div>
                )}

                {uploadMessage && (
                    <div className={`rounded-lg p-4 text-sm font-medium ${uploadMessage.type === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                        {uploadMessage.text}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition transform hover:scale-105 flex items-center justify-center gap-2"
                >
                    Mã hóa & Tải lên
                </button>
            </div>
        </form>
    );
}
