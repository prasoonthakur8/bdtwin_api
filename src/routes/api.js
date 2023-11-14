import express from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { signIn } from "../controllers/auth/signInController.js";
import { getUsersByRole } from "../controllers/getUsersByRoleController.js";
import { createSuperAgent } from "../controllers/createSuperAgentController.js";
import { createAgent } from "../controllers/createAgentController.js";
import { createPlayer } from "../controllers/createPlayerController.js";
import { logOut } from "../controllers/auth/logOutController.js";
import { refreshToken } from "../controllers/auth/refreshTokenController.js";
import { coinTransfer } from "../controllers/coinTransferController.js";
import { withdrawl } from "../controllers/withdrawalController.js";
import { getUser } from "../controllers/getUserByIdController.js";
import { getTransfers } from "../controllers/coinTransfersListController.js";
import { changeUserProfileInformation } from "../controllers/auth/userProfileInformationController.js";
import { getWithdrawls } from "../controllers/withdrawlsListController.js";
// import { depositRequest } from "../controllers/depositRequestController.js";
// import { withdrawlRequest } from "../controllers/withdrawlRequestController.js";
import {
  getData,
  cricketData,
  getAllSportsData,
  getLiveSData,
} from "../controllers/exchange/betfairController.js";

import {
  getAllUsers,
  getAllExchangeData,
  placeBet,
} from "../controllers/exchange/exchangeController.js";

import {
  fetchSportsData,
  fetchSeriesBySportId,
  fetchMatchesBySeriesAndSportId,
  fetchMarketsByMatchId,
  fetchMarketSelections,
  fetchMarketOdds,
  fetchSessionDataByMatchId,
  fetchScore,
  fetchAllData,
} from "../controllers/exchange/betExchangeController.js";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/log-out", authMiddleware, logOut);
router.post("/get-users-by-role", getUsersByRole);
router.post("/forgot-password");
router.post("/admin/create-super-agent", authMiddleware, createSuperAgent);
router.post("/super-agent/create-agent", authMiddleware, createAgent);
router.post("/agent/create-player", authMiddleware, createPlayer);
router.post("/refresh-token", authMiddleware, refreshToken);
router.post("/coin-transfer", authMiddleware, coinTransfer);
router.post("/coin-withdrawl", authMiddleware, withdrawl);

router.post("/get-user-by-id", authMiddleware, getUser);
// router.post('/deposit-request', authMiddleware, depositRequest);
// router.post('/withdrawl-request', authMiddleware, withdrawlRequest);
router.post("/coin-transfers-list", authMiddleware, getTransfers);
router.post(
  "/user-profile-information-change",
  authMiddleware,
  changeUserProfileInformation
);
router.post("/withdrawls-list", authMiddleware, getWithdrawls);

router.get("/getBetfairData", getData);
router.get("/getCricketData", cricketData);
router.get("/getAllSportsData", getAllSportsData);
router.get("/getLiveSData", getLiveSData);

router.get("/get-users-data", getAllUsers);
router.get("/exchanges", getAllExchangeData);
router.post("/placeBet", placeBet);

router.get("/betfair/sports", fetchSportsData);

// Include sportId as a route parameter
router.get("/betfair/series/:sportId", fetchSeriesBySportId);

// Include sportId and seriesId as route parameters
router.get(
  "/betfair/matches/:sportId/:seriesId",
  fetchMatchesBySeriesAndSportId
);

// Include matchId as a route parameter
router.get("/betfair/markets/:matchId", fetchMarketsByMatchId);

// Include marketId as a route parameter
router.get("/betfair/selections/:marketId", fetchMarketSelections);

// Include marketId as a route parameter
router.get("/betfair/odds/:marketId", fetchMarketOdds);

// Include matchId as a route parameter
router.get("/betfair/session/:matchId", fetchSessionDataByMatchId);

// Include matchId as a route parameter
router.get("/betfair/score/:matchId", fetchScore);

// This route seems to be fetching all data without specific parameters
router.get("/betfair/all", fetchAllData);

export default router;
