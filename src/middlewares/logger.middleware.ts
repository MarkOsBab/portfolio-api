import { logger } from "../utils/logger.js";
import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.http(`[${req.method}] ${req.url}`);

  const start = new Date().getTime();

  res.on("finish", () => {
    const duration = new Date().getTime() - start;

    logger.http(`[${req.method}] ${req.url} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};

export default loggerMiddleware;
