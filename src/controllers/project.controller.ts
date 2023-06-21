import { Request, Response } from "express";
import { ProjectService } from "../daos/services/project.service.js";
import { validationResult } from 'express-validator';
import { createProjectValidations } from "./validations/project.validation.js";

import fs from "fs";
import config from "../utils/config.js";

export class ProjectController {
    private service: ProjectService;
    private URL = `${config.publicFolderUrl}`;
    constructor(){
        this.service = new ProjectService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const projects = await this.service.getAll();
            res.status(200).send(projects);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const project = await this.service.getOne(id);
            res.status(200).json({project});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            await Promise.all(createProjectValidations.map((validation) => validation.run(req)));
            const errors = validationResult(req);

            if (!req.files || !errors.isEmpty()) {
                if (!req.files || !Array.isArray(req.files)) {
                    res.status(400).json({ error: "Files not found" });
                    return;
                }
                res.status(400).json({ error: errors.array() });
                return;
            }

            const data = req.body;
            const links = JSON.parse(req.body.links);
            data.links = links;
            if(req.files && Array.isArray(req.files)) {
                const thumbnails = req.files ? req.files.map((file: Express.Multer.File) => `${this.URL}${file.filename}`): null;
                data.thumbnails = thumbnails;
            }

            let createdProject;
            try {
                createdProject = await this.service.create(data);
            } catch (error) {
                if (req.files && Array.isArray(req.files)) {
                    req.files.forEach((file: Express.Multer.File) => {
                      fs.unlinkSync(file.path);
                    });
                }
                throw error;
            }

            res.status(201).json(createdProject);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}