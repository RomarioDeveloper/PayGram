import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authMiddleware); // Авторизация + сохранение в БД

export default router;
