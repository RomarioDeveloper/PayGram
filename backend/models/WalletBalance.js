import mongoose from "mongoose";

const walletBalanceSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  network: { type: String, required: true },
  balance: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("WalletBalance", walletBalanceSchema);
