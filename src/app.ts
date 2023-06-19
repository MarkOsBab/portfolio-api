import express from "express";
import config from "./utils/config.js";
import database from "./utils/database.js";
import logger from "./utils/logger.js";

// Middlewares
import loggerMiddleware from "./middlewares/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(loggerMiddleware);

app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
});

database.connect();