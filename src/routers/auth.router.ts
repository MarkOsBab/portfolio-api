import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();
const authController = new AuthController();

router.post('/login', async (req: Request, res: Response) => {
    await authController.login(req, res);
});

export default router;