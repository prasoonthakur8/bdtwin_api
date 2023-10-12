import { getUserWallet } from "../../services/gameHub/walletRequestService.js";

const walletRequest = async (req, res) => {
  const response = await getUserWallet(req.query);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { walletRequest };
