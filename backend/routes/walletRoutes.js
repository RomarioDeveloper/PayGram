import express from "express";
import { getWalletBalance, getTransactions } from "../services/web3Service.js";

const router = express.Router();

router.get("/balance/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
  const network = process.env.ETH_RPC_URL; // Используем переменную окружения

  try {
    const balance = await getWalletBalance(walletAddress, network);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/transactions/:walletAddress", async (req, res) => {
    try {
        const { walletAddress } = req.params;
        console.log("Received walletAddress from request:", walletAddress); // Лог запроса

        const transactions = await getTransactions(walletAddress);
        res.json(transactions);
    } catch (error) {
        console.error("Error getting transactions:", error);
        res.status(500).json({ error: error.message });
    }
});

// router.get("/transactions/:walletAddress", async (req, res) => {
//   const { walletAddress } = req.params;
//   const network = process.env.ETH_RPC_URL;

//   try {
//     const transactions = await getTransactions(walletAddress, network);
//     res.json({ transactions });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

export default router;
