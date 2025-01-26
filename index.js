import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import { DB_Connect } from "./config/DB.js";
import CourseRoutes from "./routes/Course.js";
import StudentRoutes from "./routes/Student.js";
import NewsRoutes from "./routes/News.js";
import GalleryRoutes from "./routes/Gallery.js";
import CertificateRoutes from "./routes/Certificate.js";
import UserRoutes from "./routes/User.js";
import ExamRoutes from "./routes/ExamRoutes.js";
import ResultRoutes from "./routes/Result.js";

config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure:true
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

DB_Connect();

app.use("/api/v1", CourseRoutes);
app.use("/api/v1", StudentRoutes);
app.use("/api/v1", NewsRoutes);
app.use("/api/v1", GalleryRoutes);
app.use("/api/v1", CertificateRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", ExamRoutes);
app.use("/api/v1",ResultRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is Runing Perfect" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port no ${process.env.PORT}`);
});
