import express from "express";
import fileController from "../controller/file.controller.js";
import fs from "fs";
import authUser from "../auth/checkAuth.js";
import multer from "multer";
import path from "path";
const router = express.Router();
// const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads", { recursive: true });
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => {
        const id = Date.now() + "-" + Math.random().toString(36).slice(2, 9);
        cb(null, id + path.extname(file.originalname));
    }
});
const upload = multer({ storage });
router.get("/", authUser, fileController.getFile)
router.post("/upload", authUser, upload.single("file"), fileController.uploadFile)
router.post("/:id/request-download-otp", authUser, fileController.requestDownloadOtp);
router.post("/:id/verify-download-otp", authUser, fileController.verifyDownloadOtp);
router.get("/:id/meta", authUser, fileController.getFileMeta);
router.get("/:id/raw", authUser, fileController.downloadFile);
router.delete("/:id", authUser, fileController.deleteFile);
export default router