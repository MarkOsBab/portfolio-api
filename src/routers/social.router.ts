import { SocialController } from "../controllers/social.controller.js";
import express, { Request, Response } from "express";
import { authToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
const socialController = new SocialController();

router.get('/', async (req: Request, res: Response) => {
    await socialController.getAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await socialController.getOne(req, res);
});

router.post('/', authToken(), async (req: Request, res: Response) => {
    await socialController.create(req, res);
});

router.put('/:id', authToken(), async (req: Request, res: Response) => {
    await socialController.update(req, res);
});

router.delete('/:id', authToken(), async (req: Request, res: Response) => {
    await socialController.delete(req, res);
});

export default router;