import { getGamesList } from "../../services/gameHub/getGamesListService.js";

const getGames = async (req, res) => {
  const response = await getGamesList(req);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { getGames };
