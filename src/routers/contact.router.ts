import express, { Request, Response } from "express";
import { ContactController } from "../controllers/contact.controller.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { createContactValidation } from "../controllers/validations/contact.validation.js";
import { authToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
const contactController = new ContactController();

router.get('/', authToken(), async (req: Request, res: Response) => {
    await contactController.getAll(req, res);
});

router.get('/:id', authToken(), async (req: Request, res: Response) => {
    await contactController.getOne(req, res);
});

router.post('/', validationMiddleware(createContactValidation), async (req: Request, res: Response) => {
    await contactController.create(req, res);
});

export default router;