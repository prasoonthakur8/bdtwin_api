import express from "express";

import { walletRequest } from "../controllers/gameHub/walletRequestController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getGame } from "../controllers/gameHub/getGameController.js";
import { getGames } from "../controllers/gameHub/getGamesListController.js";
import { getFilteredGames } from "../controllers/gameHub/getFilteredGamesController.js";

const router = express.Router();

router.get('', walletRequest);
router.post('/get-game', authMiddleware, getGame);
router.get('/get-games-list', getGames);
router.get('/get-filtered-games-list', getFilteredGames);

export default router;
