import axiosClient from "./axiosClient";
export const fileService = {
    getFiles: async () => {
        const res = axiosClient.get("/api/file");
        return res
    },
    uploadFile: async (formData) => {
        const res = axiosClient.post("/api/file/upload", formData);
        return res;
    },
    getFileMeta: async (id) => {
        const res = axiosClient.get(`/api/file/${id}/meta`);
        return res;
    },
    downloadFile: async (id) => {
        const res = axiosClient.get(`/api/file/${id}/raw`, {
            responseType: "arraybuffer"
        });
        return res;
    },
    requestDownloadOtp: async (id) => {
        const res = axiosClient.post(`/api/file/${id}/request-download-otp`);
        return res;
    },
    verifyDownloadOtp: async (id, otp) => {
        const res = axiosClient.post(`/api/file/${id}/verify-download-otp`, { otp });
        return res;
    },
    deleteFile: async (id) => {
        const res = axiosClient.delete(`/api/file/${id}`);
        return res;
    }
}

