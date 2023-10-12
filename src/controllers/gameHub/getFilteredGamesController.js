import { getFGames } from "../../services/gameHub/getFilteredGamesService.js";

const getFilteredGames = async (req, res) => {
  const response = await getFGames(req);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { getFilteredGames };
