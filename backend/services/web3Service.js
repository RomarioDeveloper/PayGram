import dotenv from "dotenv";
import axios from "axios";
import { ethers } from "ethers";

dotenv.config();

// Подключаемся к Ethereum через публичный RPC (или свой)
const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL || "https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY");

// Получение баланса кошелька
export async function getWalletBalance(walletAddress) {
    try {
        const balance = await provider.getBalance(walletAddress);
        return ethers.formatEther(balance); // Переводим в ETH
    } catch (error) {
        console.error("Ошибка получения баланса:", error);
        throw new Error("Не удалось получить баланс");
    }
}

// Получение транзакций через Etherscan API
export async function getTransactions(walletAddress) {
    try {
        const apiKey = process.env.ETHERSCAN_API_KEY;
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

        console.log("Fetching transactions from:", url);

        const response = await axios.get(url);
        if (response.data.status !== "1") {
            throw new Error("Ошибка при получении транзакций");
        }

        return response.data.result;
    } catch (error) {
        console.error("Ошибка получения транзакций:", error);
        throw new Error("Не удалось получить транзакции");
    }
}
