import { Request, Response } from "express";
import { KnowledgeService } from "../daos/services/knowledge.service.js";
import config from "../utils/config.js";

export class KnowledgeController {
    private service: KnowledgeService;
    private URL = `${config.publicFolderUrl}`;

    constructor(){
        this.service = new KnowledgeService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const knowledges = await this.service.getAll();
            res.status(200).json(knowledges);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const knowledge = await this.service.getOne(id);
            res.status(200).json(knowledge);
        } catch (error: any) {
            res.status(500).json({error:error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            if(!req.file) {
                res.status(400).json({error: "File not found"});
            }

            const thumbnail = `${this.URL}${req.file?.filename}`;
            data.thumbnail = thumbnail;

            const knowledge = await this.service.create(data);

            res.status(201).json(knowledge);
        } catch (error: any) {
            res.status(500).json({error:error.message});
        }
    }
}