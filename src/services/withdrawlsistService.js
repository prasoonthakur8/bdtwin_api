import Withdrawl from "../models/Withdrawal.js";
import { userJwtVerify } from "./jwtVerificationService.js";

const getWithdrawlsList = async (req) => {
  const user = await userJwtVerify(req.header('token'));

  if (req.body.all) {
    const withdrawls = await Withdrawl.find();

    return {
      message: {
        withdrawls: withdrawls
      }
    };
  }

  const withdrawls = await Withdrawl.find({ $or: [
    { sender: user._id },
    { recipient: user._id }
  ]});

  return {
    message: {
      withdrawls: withdrawls
    }
  };
};

export { getWithdrawlsList };
