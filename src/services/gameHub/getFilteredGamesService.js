import Game from "../../models/Game.js";

const getFGames = async (req) => {
  const pageNumber = req.query.page || 1;
  const pageSize = req.query.size || 18;
  const mobile = req.query.mobile || true;
  const filter = req.query.filter || 'tournaments';

  const games = await Game.paginate({ mobile: mobile, type: filter }, { page: pageNumber, limit: pageSize });
  console.log(games);

  return {
    message:{
      games: games
    }
  };
};

export { getFGames };
