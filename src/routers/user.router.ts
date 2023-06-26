import { UserController } from "../controllers/user.controller.js";
import express, { Request, Response } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { registerMiddleware } from "../middlewares/register.middleware.js";
import { createUserValidation } from "../controllers/validations/user.validation.js";
import { authToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
const userController = new UserController();

router.post('/register', authToken(), validationMiddleware(createUserValidation), async (req: Request, res: Response) => {
    await userController.create(req, res);
});

export default router;