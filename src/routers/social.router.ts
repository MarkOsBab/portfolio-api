import { SocialController } from "../controllers/social.controller.js";
import express, { Request, Response } from "express";
import { authToken } from "../middlewares/auth.middleware.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { createSocialValidations } from "../controllers/validations/social.validation.js";

const router = express.Router();
const socialController = new SocialController();

router.get('/', async (req: Request, res: Response) => {
    await socialController.getAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await socialController.getOne(req, res);
});

router.post('/', authToken(), validationMiddleware(createSocialValidations), async (req: Request, res: Response) => {
    await socialController.create(req, res);
});

router.put('/:id', authToken(), validationMiddleware(createSocialValidations), async (req: Request, res: Response) => {
    await socialController.update(req, res);
});

router.delete('/:id', authToken(), async (req: Request, res: Response) => {
    await socialController.delete(req, res);
});

export default router;