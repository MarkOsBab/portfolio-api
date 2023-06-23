import express, { Request, Response } from "express";
import { KnowledgeController } from "../controllers/knowledge.controller.js";
import { uploader } from "../utils/utils.js";
import { authToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
const knowledgeController = new KnowledgeController();

router.get('/', async (req: Request, res: Response) => {
    await knowledgeController.getAll(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await knowledgeController.getOne(req, res);
});

router.post('/', authToken(), uploader.single("thumbnail"), async(req: Request, res: Response) => {
    try {
        await knowledgeController.create(req, res);
    } catch (error: any) {
        throw Error(error.message);
    }
});

router.put('/:id', authToken(), uploader.single("thumbnail"), async (req: Request, res: Response) => {
    await knowledgeController.update(req, res);
});

router.delete('/:id', authToken(), async (req: Request, res: Response) => {
    await knowledgeController.delete(req, res);
});

export default router;