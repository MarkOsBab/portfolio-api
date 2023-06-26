import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { createAuthValidation } from "../controllers/validations/auth.validation.js";

const router = express.Router();
const authController = new AuthController();

router.post('/login', validationMiddleware(createAuthValidation), async (req: Request, res: Response) => {
    await authController.login(req, res);
});

export default router;