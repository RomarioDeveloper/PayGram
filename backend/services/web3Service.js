import dotenv from "dotenv";
import axios from "axios";
import { ethers } from "ethers";
import Transaction from "../models/transactionModel.js"; // Импорт модели MongoDB

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL || "https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY");

// 🔹 Функция получения баланса
export async function getWalletBalance(walletAddress) {
    try {
        if (!ethers.isAddress(walletAddress)) {
            throw new Error("Invalid wallet address");
        }

        const balance = await provider.getBalance(walletAddress);
        return ethers.formatEther(balance); // Конвертируем в ETH
    } catch (error) {
        console.error("Ошибка получения баланса:", error);
        throw new Error("Не удалось получить баланс");
    }
}

// 🔹 Функция получения транзакций
export async function getTransactions(walletAddress) {
    try {
        const apiKey = process.env.ETHERSCAN_API_KEY;
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

        console.log("Fetching transactions from:", url);
        const response = await axios.get(url);
        
        if (response.data.status !== "1") {
            throw new Error("Ошибка при получении транзакций");
        }

        const transactions = response.data.result; // Полученные транзакции

        // 🔹 Логируем транзакции в MongoDB
        for (let tx of transactions) {
            await Transaction.updateOne(
                { hash: tx.hash }, // Проверяем по хешу, чтобы не дублировать
                { $set: tx }, 
                { upsert: true } // Вставить, если нет в базе
            );
        }

        console.log(`Сохранено ${transactions.length} транзакций в базе.`);
        return transactions;
    } catch (error) {
        console.error("Ошибка получения транзакций:", error);
        throw new Error("Не удалось получить транзакции");
    }
}
