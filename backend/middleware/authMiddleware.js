import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { validateTelegramAuth } from "../utils/validateTelegramAuth.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (req, res) => {
  try {
    const { initData } = req.body;
    const data = validateTelegramAuth(initData);

    if (!data || !data.user) {
      return res.status(401).json({ message: "Ошибка авторизации Telegram" });
    }

    const { id, username, first_name, last_name, photo_url } = JSON.parse(data.user);

    let user = await User.findOne({ telegramId: id });

    if (!user) {
      user = await User.create({
        telegramId: id,
        username,
        first_name,
        last_name,
        photo_url,
      });
    }

    const token = jwt.sign({ id: user.telegramId }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: "Ошибка валидации Telegram", error });
  }
};
