import Game from "../../models/Game.js";

const getGamesList = async (req) => {
  const pageNumber = req.query.page || 1;
  const pageSize = req.query.size || 18;
  const mobile = req.query.mobile || true;

  const games = await Game.paginate({ mobile: mobile }, { page: pageNumber, limit: pageSize });

  return {
    message:{
      games: games
    }
  };
};

export { getGamesList };
