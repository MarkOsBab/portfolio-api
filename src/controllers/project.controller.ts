import { Request, Response } from "express";
import { projectService } from "../services/index.js";

import fs from "fs";
import config from "../utils/config.js";

export class ProjectController {
    private service: typeof projectService;
    private URL = `${config.publicFolderUrl}`;
    constructor(){
        this.service = projectService;
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
           
            if(req.files && !req.files.length) {
                res.status(400).json({ error: "Files not found" });
                return;
            }

            const data = req.body;
            data.links = JSON.parse(req.body.links);
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

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;
            data.links = JSON.parse(req.body.links);
        
            let updatedProject;
        
            if (req.files && Array.isArray(req.files) && req.files.length) {
                const thumbnails = req.files.map((file: Express.Multer.File) => `${this.URL}${file.filename}`);
                data.thumbnails = thumbnails;
            }
        
            try {
                updatedProject = await this.service.update(id, data);
            } catch (error) {
                if (req.files && Array.isArray(req.files)) {
                    req.files.forEach((file: Express.Multer.File) => {
                        fs.unlinkSync(file.path);
                    });
                }
                throw error;
            }

            res.status(200).json(updatedProject);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const project = await this.service.delete(id);

            res.status(200).json(project);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
      
}