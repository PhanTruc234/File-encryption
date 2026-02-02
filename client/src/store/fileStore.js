import { create } from "zustand";
import { base64ToBuf, bufToBase64, decryptArrayBuffer, encryptArrayBuffer, deriveKey } from "../untils/cryptoUtil";
import { fileService } from "../service/fileService";

export const useFileStore = create((set, get) => ({
    files: [],
    loading: false,
    showOtpModal: false,
    otpFileId: null,
    loadFiles: async () => {
        try {
            set({ loading: true });
            const res = await fileService.getFiles();
            set({ files: res.data.files });
            console.log(res, "resresresresres")
            return res;
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false });
        }
    },
    uploadEncryptedFile: async (file, password) => {
        try {
            const ab = await file.arrayBuffer();
            console.log(ab, "abababababab")
            const { cipher, salt, iv } = await encryptArrayBuffer(ab, password);
            const fd = new FormData();
            fd.append("file", new Blob([cipher]), file.name + ".enc");
            fd.append("salt", bufToBase64(salt));
            fd.append("iv", bufToBase64(iv));
            fd.append("originalName", file.name);
            console.log([...fd.entries()], "fdddddddddd");
            const res = await fileService.uploadFile(fd);
            await get().loadFiles();
            return res;
        } catch (error) {
            console.log(error)
        }
    },

    requestDownloadOtp: async (id) => {
        try {
            const res = await fileService.requestDownloadOtp(id);
            if (res.data.ok) {
                set({ showOtpModal: true, otpFileId: id });
                return res;
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi khi gửi OTP");
        }
    },

    verifyAndDownload: async (id, otp, password) => {
        try {
            console.log("Verifying OTP:", otp, "for file:", id);
            const verifyRes = await fileService.verifyDownloadOtp(id, otp);
            console.log("OTP verify response:", verifyRes);

            if (!verifyRes.data.ok) {
                return { ok: false, message: verifyRes.data.message || "OTP không đúng" };
            }

            set({ showOtpModal: false, otpFileId: null });
            await get().downloadAndDecrypt(id, password);
            return { ok: true };
        } catch (error) {
            console.error("Verify OTP error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Lỗi khi xác nhận OTP";
            return { ok: false, message: errorMessage };
        }
    },

    downloadAndDecrypt: async (id, password) => {
        try {
            const meta = await fileService.getFileMeta(id);
            const raw = await fileService.downloadFile(id);
            console.log(meta, raw, "ooooooooooooooooooooooooooooo")
            const salt = base64ToBuf(meta.data.meta.salt);
            const iv = base64ToBuf(meta.data.meta.iv);
            console.log(raw.data,
                password,
                salt,
                iv, "okhokhoykhyjk")
            const plain = await decryptArrayBuffer(
                raw.data,
                password,
                salt,
                iv
            );

            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([plain]));
            a.download = meta.data.meta.originalName;
            a.click();

            return plain;
        } catch (error) {
            console.error(error);
        }
    },
    deleteFile: async (id) => {
        try {
            await fileService.deleteFile(id);
            set({ files: get().files.filter((f) => f._id !== id) });
        } catch (error) {
            console.log(error)
        }
    },
    verifyPassword: async (id, password) => {
        try {
            const meta = await fileService.getFileMeta(id);
            if (!meta.data || !meta.data.meta) {
                return { ok: false, message: "Không thể lấy thông tin tệp" };
            }

            const salt = base64ToBuf(meta.data.meta.salt);
            const iv = base64ToBuf(meta.data.meta.iv);

            // tải file
            const raw = await fileService.downloadFile(id);
            if (!raw.data) {
                return { ok: false, message: "Không thể tải tệp" };
            }

            // Thử decrypt để kiểm tra password có đúng không
            try {
                await decryptArrayBuffer(raw.data, password, salt, iv);
                return { ok: true, message: "Mật khẩu chính xác" };
            } catch (decryptErr) {
                console.error("Decrypt error:", decryptErr);
                return { ok: false, message: "Mật khẩu không đúng" };
            }
        } catch (error) {
            console.error("Password verification error:", error);
            return { ok: false, message: "Lỗi kiểm tra mật khẩu: " + error.message };
        }
    }
}));
