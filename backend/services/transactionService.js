import Transaction from "../models/Transaction.js";

export const saveTransactionsToDB = async (walletAddress, network, transactions) => {
  try {
    for (const tx of transactions) {
      const existingTx = await Transaction.findOne({ hash: tx.hash });
      if (!existingTx) {
        await Transaction.create({
          walletAddress,
          network,
          ...tx,
        });
      }
    }
  } catch (error) {
    console.error("Ошибка сохранения транзакций:", error);
  }
};
