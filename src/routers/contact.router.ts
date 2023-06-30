import express, { Request, Response } from "express";
import { ContactController } from "../controllers/contact.controller.js";

const router = express.Router();
const contactController = new ContactController();

router.get('/', async (req: Request, res: Response) => {
    await contactController.getAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await contactController.getOne(req, res);
});

export default router;