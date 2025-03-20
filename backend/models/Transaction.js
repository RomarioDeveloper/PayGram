import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  type: { type: String, enum: ["balance_check", "transaction_history"], required: true },
  amount: { type: String },
  network: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
