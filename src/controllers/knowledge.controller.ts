import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { createKnowledgeValidations } from "./validations/knowledge.validation.js";

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
          await Promise.all(createKnowledgeValidations.map((validation) => validation.run(req)));
          const errors = validationResult(req);
      
          if (!req.file || !errors.isEmpty()) {
            if (req.file) {
              fs.unlinkSync(req.file.path);
            }
            res.status(400).json({ error: req.file ? errors.array() : "File not found" });
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
      
          res.status(201).json(createdKnowledge);
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    }      

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            
            const knowledge = await this.service.update(id, data);

            res.status(200).json({knowledge});
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