import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
// Utils
import config from "./utils/config.js";
import database from "./utils/database.js";
import { logger } from "./utils/logger.js";
// Middlewares
import loggerMiddleware from "./middlewares/logger.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { AuthMiddleware } from "./auth/passport.js";
// Routers
import kowledgeRouter from "./routers/knowledge.router.js";
import projectRouter from "./routers/project.router.js";
import socialRouter from "./routers/social.router.js";
import userRouter from "./routers/user.router.js";

const app = express();
const authMiddleware = new AuthMiddleware();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(loggerMiddleware);

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.dbUrl,
        ttl: 120
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.secretKey!
}));

app.use(passport.initialize());
app.use(passport.session());
authMiddleware.initializePassport();

app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
});

database.connect();
app.use(errorMiddleware);

app.use("/api/knowledge", kowledgeRouter);
app.use("/api/projects", projectRouter);
app.use("/api/socials", socialRouter);
app.use("/api/users", userRouter);