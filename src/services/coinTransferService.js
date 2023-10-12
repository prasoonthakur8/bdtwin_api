import mongoose from "mongoose";

import Wallet from "../models/Wallet.js";
import CoinTransfer from "../models/CoinTransfers.js";

const sendCoin = async (req) => {
  const { sender, recipient, amount } = req.body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let senderWallet = await Wallet.findOne({ user: sender });
    let recipientWallet = await Wallet.findOne({ user: recipient });

    if (!(senderWallet.balance >= amount))
      return { message: 'Not enough funds.', status: 403 };
    
    senderWallet.balance -= amount;
    await senderWallet.save();

    recipientWallet.balance += amount;
    await recipientWallet.save();

    const transaction = new CoinTransfer({
      sender: sender,
      recipient: recipient,
      amount: amount
    });
    await transaction.save();

    await session.commitTransaction();
    session.endSession();

    return { message: true };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error.message);

    return { message: false };
  }
};

export { sendCoin };
