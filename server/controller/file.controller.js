import fileModel from "../src/models/file.model.js";
import fs from "fs";
import path from "path";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import modelOtp from "../src/models/otp.model.js";
import jwt from "jsonwebtoken";
import { sendMailForgotPassword } from "../src/utils/sendMailForgotPassword.js";
import modelUser from "../src/models/users.model.js";
class fileController {
    async getFile(req, res) {
        const files = await fileModel.find({ owner: req.user.id })
            .sort({ createdAt: -1 })
            .lean();
        res.json({ ok: true, files });
    }
    async uploadFile(req, res) {
        const { salt, iv, originalName } = req.body;
        if (!req.file) return res.status(400).json({ ok: false });
        const doc = await fileModel.create({
            owner: req.user.id,
            originalName,
            storedName: req.file.filename,
            salt,
            iv
        });
        res.json({ ok: true, fileId: doc._id });
    }
    async getFileMeta(req, res) {
        try {
            const doc = await fileModel.findOne({
                _id: req.params.id,
                owner: req.user.id
            }).lean();

            if (!doc) {
                return res.status(404).json({ ok: false });
            }

            return res.json({
                ok: true,
                meta: {
                    originalName: doc.originalName,
                    salt: doc.salt,
                    iv: doc.iv
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ ok: false });
        }
    }
    async downloadFile(req, res) {
        try {
            const doc = await fileModel.findOne({
                _id: req.params.id,
                owner: req.user.id
            }).lean();

            if (!doc) {
                return res.status(404).json({ ok: false });
            }

            const filePath = path.join("./uploads", doc.storedName);
            const fileData = fs.readFileSync(filePath);
            res.set("Content-Type", "application/octet-stream");
            return res.send(fileData);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ ok: false });
        }
    }
    async deleteFile(req, res) {
        try {
            const doc = await fileModel.findOne({
                _id: req.params.id,
                owner: req.user.id
            }).lean();

            if (!doc) {
                return res.status(404).json({ ok: false });
            }

            const filePath = path.join("./uploads", doc.storedName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            await fileModel.deleteOne({ _id: req.params.id });

            return res.json({ ok: true });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ ok: false });
        }
    }

    async requestDownloadOtp(req, res) {
        try {
            const doc = await fileModel.findOne({
                _id: req.params.id,
                owner: req.user.id
            }).lean();

            if (!doc) {
                return res.status(404).json({ ok: false, message: "File không tồn tại" });
            }

            const user = await modelUser.findById(req.user.id);
            if (!user) {
                return res.status(401).json({ ok: false, message: "Người dùng không tồn tại" });
            }

            const token = jwt.sign(
                { id: user._id, fileId: doc._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );

            const otp = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            console.log("Generated OTP:", otp, "for email:", user.email);

            // Xóa OTP cũ trước
            await modelOtp.deleteMany({ email: user.email });

            const hash = await bcrypt.hash(otp, 10);
            await modelOtp.create({ email: user.email, otp: hash });
            await sendMailForgotPassword(user.email, otp);

            res.cookie("tokenDownloadFile", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 15 * 60 * 1000,
            });

            return res.json({ ok: true, message: "Đã gửi OTP về email" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ ok: false, message: "Lỗi server" });
        }
    }

    async verifyDownloadOtp(req, res) {
        try {
            const { otp } = req.body;
            const token = req.cookies.tokenDownloadFile;

            console.log("Verifying OTP. Received OTP:", otp);
            console.log("Token:", token ? "Present" : "Missing");

            if (!token) {
                return res.status(401).json({ ok: false, message: "Token không hợp lệ" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded:", decoded.email);

            const doc = await fileModel.findOne({
                _id: decoded.fileId,
                owner: req.user.id
            }).lean();

            if (!doc) {
                return res.status(404).json({ ok: false, message: "File không tồn tại" });
            }

            const otpRecord = await modelOtp.findOne({ email: decoded.email });
            if (!otpRecord) {
                console.log("OTP record not found for email:", decoded.email);
                return res.status(400).json({ ok: false, message: "OTP không hợp lệ" });
            }

            // Trim OTP nếu user copy có spaces
            const trimmedOtp = String(otp).trim();
            console.log("Trimmed OTP:", trimmedOtp, "Length:", trimmedOtp.length);

            const isMatch = await bcrypt.compare(trimmedOtp, otpRecord.otp);
            console.log("OTP match result:", isMatch);

            if (!isMatch) {
                return res.status(400).json({ ok: false, message: "OTP không đúng" });
            }

            await modelOtp.deleteOne({ email: decoded.email });
            res.clearCookie("tokenDownloadFile");

            return res.json({ ok: true, message: "OTP xác nhận thành công", canDownload: true });
        } catch (err) {
            console.error("Verify OTP Error:", err);
            return res.status(500).json({ ok: false, message: "Lỗi server: " + err.message });
        }
    }
}
export default new fileController()