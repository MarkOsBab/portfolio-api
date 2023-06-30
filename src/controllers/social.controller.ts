import { Request, Response } from "express";
import { socialService } from "../services/index.js";

export class SocialController {
    private service: typeof socialService;

    constructor(){
        this.service = socialService;
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const socials = await this.service.getAll();
            res.status(200).json(socials);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const social = await this.service.getOne(id);
            res.status(200).json(social);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const social = await this.service.create(data);
            res.status(200).json(social);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;

            const social = await this.service.update(id, data);
            res.status(200).json(social);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const social = await this.service.delete(id);
            res.status(200).send(social);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }
}