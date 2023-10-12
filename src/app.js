import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodeCron from "node-cron";

import { updateGamesList } from "./services/gameHub/updateGamesListService.js";
import connectDatabase from "./config/database.js";
import createRoles from "./utils/createRoles.js";
import createAdmin from "./utils/createAdmin.js";
import api from "./routes/api.js";
import gameHub from "./routes/gameHub.js";
import web from "./routes/web.js";

dotenv.config();

connectDatabase();

await createRoles();
await createAdmin();

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(cors({ origin: '*' }));

app.use('/api', api);
app.use('/api/game-hub', gameHub);
app.use('/', web);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}.`);
});

nodeCron.schedule('0 4 * * *', updateGamesList);
