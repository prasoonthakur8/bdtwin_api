import { getTransfersList } from "../services/coinTransfersListService.js";

const getTransfers = async (req, res) => {
  const response = await getTransfersList(req);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { getTransfers }