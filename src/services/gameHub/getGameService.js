import crypto from "crypto";

import { userJwtVerify } from "../jwtVerificationService.js";

const getCasinoGame = async (req) => {
  const user = await userJwtVerify(req.header('token'));

  const data = {
    api_login: process.env.BLUEOCEANGAMING_API_USERNAME,
    api_password: process.env.BLUEOCEANGAMING_API_PASSWORD,
    method: "getGame",
    lang: "US",
    user_username: user.user_name,
    user_password: crypto.createHash('sha1', process.env.GAME_HUB_PASSWORD).update(process.env.GAME_HUB_PASSWORD).digest('hex'),
    gameid: req.body.game_id,
    play_for_fun: 0,
    currency: process.env.CURRENCY
  };

  const game = await fetch(process.env.BLUEOCEANGAMING_API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  }).then((response) => { return response.json(); });

  return {
    game: game
  };
};

export { getCasinoGame };
