import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    telegramId: { type: String, required: true, unique: true }, // ID пользователя в Telegram
    username: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    photo_url: { type: String },
    walletAddress: { type: String }, // Web3-кошелек (добавим позже)
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
