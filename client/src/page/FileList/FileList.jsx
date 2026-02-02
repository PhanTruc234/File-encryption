import { useState } from "react";

export default function FileList({ files, onDownload, onDelete }) {
    const [expandedId, setExpandedId] = useState(null);

    if (!files || files.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
                <div className="text-6xl mb-4"></div>
                <p className="text-gray-600 text-lg font-semibold">Chưa có tệp nào</p>
                <p className="text-gray-500">Tải tệp đầu tiên của bạn để bắt đầu</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-3"></span>
                Các tệp của tôi ({files.length})
            </h2>
            <div className="grid gap-4">
                {files?.map((f) => (
                    <div
                        key={f._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 overflow-hidden"
                    >
                        <div className="p-5">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl"></span>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-gray-800 truncate">{f.originalName}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(f.createdAt).toLocaleDateString('vi-VN')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setExpandedId(expandedId === f._id ? null : f._id)}
                                    className="ml-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
                                >
                                    {expandedId === f._id ? "✕" : "⋯"}
                                </button>
                            </div>
                            {expandedId === f._id && (
                                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                onDownload(f._id);
                                            }}
                                            className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center gap-2"
                                        >
                                            Tải & Giải mã
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm("Bạn chắc chắn muốn xóa tệp này?")) {
                                                    onDelete(f._id);
                                                    setExpandedId(null);
                                                }
                                            }}
                                            className="bg-red-50 text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
