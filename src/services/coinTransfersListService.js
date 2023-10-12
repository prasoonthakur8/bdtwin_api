import CoinTransfers from "../models/CoinTransfers.js";
import { userJwtVerify } from "./jwtVerificationService.js";

const getTransfersList = async (req) => {
  const user = await userJwtVerify(req.header('token'));

  if (req.body.all) {
    const transfers = await CoinTransfers.find();

    return {
      message: {
        coinTransfers: transfers
      }
    };
  }

  const transfers = await CoinTransfers.find({ $or: [
    { sender: user._id },
    { recipient: user._id }
  ]});

  return {
    message: {
      coinTransfers: transfers
    }
  };
}
export { getTransfersList };
