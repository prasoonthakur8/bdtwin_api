import { getWithdrawlsList } from "../services/withdrawlsistService.js";

const getWithdrawls = async (req, res) => {
  const response = await getWithdrawlsList(req);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { getWithdrawls };
