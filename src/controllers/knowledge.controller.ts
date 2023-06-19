import { Request, Response } from "express";
import { KnowledgeService } from "../daos/services/knowledge.service.js";

export class KnowledgeController {
    private service: KnowledgeService;

    constructor(){
        this.service = new KnowledgeService();
    }

    public async getAllKnowledge(req: Request, res: Response): Promise<void> {
        try {
            const knowledge = await this.service.getAllKnowledge();
            res.status(200).json(knowledge);
        } catch (error: any) {
            res.status(error.statusCode).json({error: error.message});
        }
    }
}