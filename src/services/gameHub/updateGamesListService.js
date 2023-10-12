import fetch from "node-fetch";

import Game from "../../models/Game.js";

const updateGamesList = async () => {
  try {
    const data = {
      api_password: process.env.BLUEOCEANGAMING_API_PASSWORD,
      api_login: process.env.BLUEOCEANGAMING_API_USERNAME,
      method: "getGameList",
      show_additional: true,
      show_systems: 1,
      currency: process.env.CURRENCY,
    };

    const { response } = await fetch(process.env.BLUEOCEANGAMING_API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json());

    await Game.deleteMany();

    const gamesData = response.map((element) => {
      return {
        id: element.id,
        name: element.name,
        type: element.type,
        details: element.details,
        mobile: element.mobile,
        image: element.image,
        image_preview: element.image_preview,
        image_filled: element.image_filled,
        image_portrait: element.image_portrait,
        image_square: element.image_square,
        image_background: element.image_background,
        image_bw: element.image_bw,
      };
    });

    const games = await Promise.all(gamesData);

    await Game.insertMany(games);

    console.log('games updated.');
  } catch (error) {
    console.error('Error:', error);
  }
};

export { updateGamesList };
