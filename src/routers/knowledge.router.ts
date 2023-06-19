import express, { Request, Response } from "express";
import { KnowledgeController } from "../controllers/knowledge.controller.js";

const router = express.Router();
const knowledgeController = new KnowledgeController();

router.get('/', async (req: Request, res: Response) => {
    await knowledgeController.getAllKnowledge(req, res);
});


export default router;