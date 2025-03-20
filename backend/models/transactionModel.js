import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    blockNumber: String,
    timeStamp: String,
    hash: { type: String, unique: true }, // Уникальный хеш транзакции
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    isError: String,
    txreceipt_status: String
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
