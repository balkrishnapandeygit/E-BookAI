import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import eBookRoutes from "./routes/eBookRoutes.js";
import path from "path";

dotenv.config();
const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: false,
}));

app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/ebook", eBookRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("eBook Backend API is running...");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
