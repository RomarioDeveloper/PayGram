import express from "express";
import { getWalletBalance, getTransactions } from "../services/web3Service.js";

const router = express.Router();

// 🔹 Эндпоинт для получения баланса кошелька
router.get("/balance/:walletAddress", async (req, res) => {
    try {
        const walletAddress = req.params.walletAddress;
        const balance = await getWalletBalance(walletAddress);
        res.json({ walletAddress, balance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🔹 Эндпоинт для получения транзакций
router.get("/transactions/:walletAddress", async (req, res) => {
    try {
        const walletAddress = req.params.walletAddress;
        const transactions = await getTransactions(walletAddress);
        res.json({ walletAddress, transactions });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
