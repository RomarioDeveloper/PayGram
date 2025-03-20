import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN; // Токен бота

export const validateTelegramAuth = (initData) => {
  if (!initData) return null;

  // Преобразуем строку в объект
  const params = new URLSearchParams(initData);
  const dataObj = {};
  for (const [key, value] of params.entries()) {
    dataObj[key] = value;
  }

  // Достаем хеш и удаляем его из объекта
  const { hash, ...dataToCheck } = dataObj;
  if (!hash) return null;

  // Сортируем и форматируем данные
  const sortedParams = Object.keys(dataToCheck)
    .sort()
    .map((key) => `${key}=${dataToCheck[key]}`)
    .join("\n");

  // Создаем HMAC-SHA256 подпись
  const secretKey = crypto.createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
  const computedHash = crypto.createHmac("sha256", secretKey).update(sortedParams).digest("hex");

  // Проверяем подпись
  return computedHash === hash ? dataToCheck : null;
};
