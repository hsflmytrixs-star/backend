import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";
import blogRoute from "./routes/blogRoute.js";
import multer from "multer";
import path from "path";
import isAuthenticated from "./middleware/isAuthenticated.js";
import nodemailer from "nodemailer";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

const corsOption = {
  origin: "https://schoolofregeneration.com",
  credentials: true,
};
app.use(cors(corsOption));

app.use("/uploads", express.static("uploads"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/api/send-mail", async (req, res) => {
  const { firstName, lastName, phone, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    // Custom SMTP transport config with TLS options
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",       // Gmail SMTP server
      port: 587,                    // TLS port
      secure: false,                // Use STARTTLS, so secure=false
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `Contact Form Submission from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || "Not Provided"}

        Message:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

app.post("/api/upload", isAuthenticated, upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    src: imageUrl,
  });
});

// Video upload
app.post("/api/upload/video", isAuthenticated, upload.single("video"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No video uploaded" });
  }

  const videoUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    src: videoUrl,
  });
});

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/blog", blogRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
