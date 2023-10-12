import mongoose, { mongo } from "mongoose";

import Wallet from "../models/Wallet.js";
import Withdrawal from "../models/Withdrawal.js";

const coinWithdrawl = async (req) => {
  const { sender, recipient, amount } = req.body;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let playerWallet = await Wallet.findOne({ user: sender });
    let agentWallet = await Wallet.findOne({ user: recipient });

    if (!(playerWallet.balance >= amount))
      return { message: 'Not enough funds.', status: 403 };
    
    playerWallet.balance -= amount;
    await playerWallet.save();

    agentWallet.balance += amount;
    await agentWallet.save();

    const transaction = new Withdrawal({
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

export { coinWithdrawl };
