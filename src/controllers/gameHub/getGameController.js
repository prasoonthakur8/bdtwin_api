import { getCasinoGame } from "../../services/gameHub/getGameService.js";

const getGame = async (req, res) => {
  const response = await getCasinoGame(req);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { getGame };
