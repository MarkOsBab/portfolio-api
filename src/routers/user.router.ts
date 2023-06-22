import { UserController } from "../controllers/user.controller.js";
import express, { Request, Response } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { passportMiddleware } from "../middlewares/passport.middleware.js";
import { createUserValidation } from "../controllers/validations/user.validation.js";

const router = express.Router();
const userController = new UserController();

router.post('/register', validationMiddleware(createUserValidation), passportMiddleware("register"), async (req: Request, res: Response) => {
    await userController.create(req, res);
});

export default router;