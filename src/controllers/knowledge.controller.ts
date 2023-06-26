import { Request, Response } from "express";
import { KnowledgeService } from "../daos/services/knowledge.service.js";
import config from "../utils/config.js";
import fs from "fs";

export class KnowledgeController {
    private service: KnowledgeService;
    private URL = `${config.publicFolderUrl}`;

    constructor(){
        this.service = new KnowledgeService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { category } = req.query;
            const knowledges = await this.service.getAll(category as string);            
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
          if (!req.file) {
            res.status(400).json({ error: "File not found" });
            return;
          }
      
          const data = req.body;
          const thumbnail = `${this.URL}${req.file?.filename}`;
          data.thumbnail = thumbnail;
      
          let createdKnowledge;
          try {
            createdKnowledge = await this.service.create(data);
          } catch (error) {
            fs.unlinkSync(req.file.path);
            throw error;
          }
      
          res.status(200).json(createdKnowledge);
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    }      

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            if(req.file) {
                const thumbnail = `${this.URL}${req.file?.filename}`;
                data.thumbnail = thumbnail;
            }

            let updatedKnowledge;
            try {
                updatedKnowledge = await this.service.update(id, data);
            } catch (error) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                throw error;
            }

            res.status(200).json({updatedKnowledge});
        } catch (error: any) {
            res.status(500).json({error:error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const knowledge = await this.service.delete(id);
            res.status(200).json({knowledge});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}