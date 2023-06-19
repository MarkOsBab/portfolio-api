import { logger } from "../utils/logger.js";
import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Registra el inicio de la solicitud en el logger
  logger.http(`[${req.method}] ${req.url}`);

  // Registra el tiempo de inicio de la solicitud
  const start = new Date().getTime();

  // Agrega una función para registrar el final de la solicitud después de que se envíe la respuesta
  res.on("finish", () => {
    // Calcula la duración de la solicitud
    const duration = new Date().getTime() - start;

    // Registra el final de la solicitud en el logger
    logger.http(`[${req.method}] ${req.url} - ${res.statusCode} (${duration}ms)`);
  });

  // Llama a la siguiente función de middleware
  next();
};

export default loggerMiddleware;
