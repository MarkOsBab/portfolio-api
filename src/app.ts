import express from "express";
// Utils
import config from "./utils/config.js";
import database from "./utils/database.js";
import { logger } from "./utils/logger.js";
// Middlewares
import loggerMiddleware from "./middlewares/logger.middleware.js";
// Routers
import kowledgeRouter from "./routers/knowledge.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(loggerMiddleware);

app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
});

app.use("/api/knowledge", kowledgeRouter);

database.connect();