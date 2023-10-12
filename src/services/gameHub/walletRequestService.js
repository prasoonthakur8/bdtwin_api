import crypto from "crypto";

import User from "../../models/User.js";
import Wallet from "../../models/Wallet.js";
import GameTransaction from "../../models/GameTransaction.js";
import { getUserData } from "../../resources/userResource.js";

const getUserWallet = async (req) => {
  const user = await User.findOne({ player_remote_id: req.remote_id });
  var userWallet = await Wallet.findOne({ user: user.id });
  let balance = 0;
  const pass = crypto.createHash('sha1', process.env.BLUEOCEANGAMING_API_PASSWORD).update(process.env.BLUEOCEANGAMING_API_PASSWORD).digest('hex');

  if (!(req.callerId === process.env.BLUEOCEANGAMING_API_USERNAME && req.callerPassword === pass)) {
    return {
      message: {
        error: 'Authentication failed.'
      }
    };
  }

  if (req.action === 'balance') {
    const person = await getUserData(user);
    balance = person.balance;
    balance = balance.toFixed(2);

    return { status: 200, balance: balance };
  } else if (req.action === 'debit') {
    balance = userWallet.balance - parseFloat(req.amount);
    balance = balance.toFixed(2)
    userWallet.balance = balance;

    await userWallet.save();

    GameTransaction.create({
      user: user,
      game_id: req.game_id,
      game_session_id: req.gamesession_id,
      loss: req.amount
    });

    // socket.emit('message', userWallet.balance);
    // console.log(socket);

    return { status: 200, balance: balance };

  } else if (req.action === 'credit') {
    balance = userWallet.balance + parseFloat(req.amount);
    balance = balance.toFixed(2)
    userWallet.balance = balance;
    await userWallet.save();

    GameTransaction.create({
      user: user,
      game_id: req.game_id,
      game_session_id: req.gamesession_id,
      win: req.amount
    });

    // socket.emit('message', userWallet.balance);

    return { status: 200, balance: balance };
  }
};

export { getUserWallet };
