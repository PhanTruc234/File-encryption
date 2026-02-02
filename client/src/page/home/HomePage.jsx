import { useEffect, useState } from "react";
import UploadForm from "../upLoadForm/UploadForm";
import FileList from "../FileList/FileList";
import LockScreen from "../LookScreen/LockScreen";
import OtpModal from "../../components/OtpModal";
import PasswordModal from "../../components/PasswordModal";
import { useFileStore } from "../../store/fileStore";
import { UserAuthStore } from "../../store/userAuthStore";

export default function HomePage() {
    const [locked, setLocked] = useState(false);
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");
    const [uploadMessage, setUploadMessage] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState(null);
    const { files, loadFiles, uploadEncryptedFile, requestDownloadOtp, verifyAndDownload,
        deleteFile, showOtpModal, otpFileId } = useFileStore()
    const handleUpload = async (e) => {
        e.preventDefault();
        console.log("Upload:", file, password);
        if (!file || !password) {
            alert("Thiếu file hoặc mật khẩu");
            return;
        }
        try {
            await uploadEncryptedFile(file, password)
            setUploadMessage({
                type: 'success',
                text: `"${file.name}" tải lên thành công!`
            });
            setFile(null);
            setPassword("");
            setTimeout(() => setUploadMessage(null), 4000);
        } catch (error) {
            setUploadMessage({
                type: 'error',
                text: `✗ Lỗi khi tải lên "${file.name}"`
            });
            setTimeout(() => setUploadMessage(null), 4000);
        }
    };

    const handleDownload = async (id) => {
        setSelectedFileId(id);
        setShowPasswordModal(true);
    };

    const handleDelete = (id) => {
        console.log("Delete:", id);
    };

    if (locked) {
        return <LockScreen onUnlock={() => setLocked(false)} />;
    }
    useEffect(() => {
        const callFile = async () => {
            await loadFiles()
        }
        callFile()
    }, []);
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-center flex-1">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 mb-2">
                            Kho Lưu Trữ An Toàn
                        </h1>
                        <p className="text-gray-600">Mã hóa và bảo vệ tệp của bạn với mật khẩu</p>
                    </div>
                    <button
                        onClick={() => UserAuthStore.getState().logout()}
                        className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2"
                    >
                        Đăng xuất
                    </button>
                </div>

                <UploadForm
                    password={password}
                    setPassword={setPassword}
                    setFile={setFile}
                    selectedFile={file}
                    uploadMessage={uploadMessage}
                    onUpload={handleUpload}
                />
                <FileList
                    files={files}
                    onDownload={handleDownload}
                    onDelete={deleteFile}
                />

                {showPasswordModal && selectedFileId && (
                    <PasswordModal
                        fileId={selectedFileId}
                        onClose={() => {
                            setShowPasswordModal(false);
                            setSelectedFileId(null);
                        }}
                    />
                )}

                {showOtpModal && otpFileId && (
                    <OtpModal
                        fileId={otpFileId}
                        onVerify={(otp) => verifyAndDownload(otpFileId, otp, window.downloadPassword)}
                        onClose={() => useFileStore.setState({ showOtpModal: false, otpFileId: null })}
                    />
                )}
            </div>
        </div>
    );
}
