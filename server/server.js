
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoute from "./src/routes/users.routes.js";
import fileRoute from "./src/routes/file.routes.js"
import connectDB from "./src/config/connectDB.js";
import usersController from "./src/controller/users.controller.js";
import authUser from "./src/auth/checkAuth.js";
import { globalLimiter } from "./src/middlewares/rateLimit.js";
const PORT = 4000;
const app = express();
connectDB();
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.use(globalLimiter);
app.use("/api", userRoute);
app.use("/api/file", fileRoute);
app.post("/logout", authUser, usersController.logout);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});