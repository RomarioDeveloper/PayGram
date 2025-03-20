import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);


app.get("/", (req, res) => {
  res.send("TG PayHub API is running...");
});

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
