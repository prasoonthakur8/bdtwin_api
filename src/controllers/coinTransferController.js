import { sendCoin } from "../services/coinTransferService.js";

const coinTransfer = async (req, res) => {
  const response = await sendCoin(req);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { coinTransfer };
