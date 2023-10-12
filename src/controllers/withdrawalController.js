import { coinWithdrawl } from "../services/withdrawlService.js";

const withdrawl = async (req, res) => {
  const response = await coinWithdrawl(req);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { withdrawl };
