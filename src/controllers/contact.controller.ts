import { Request, Response } from "express";
import { contactService } from "../services/index.js";

export class ContactController {
    private service: typeof contactService;

    constructor(){
        this.service = contactService;
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { was_answered } = req.query;
            console.log(was_answered);
            
            const contacts = await this.service.getAll(was_answered as string | undefined);
            res.status(200).json(contacts);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const contact = await this.service.getOne(id);

            res.status(200).json(contact);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { firstname, lastname, email, message } = req.body;
            
            const data = {
                firstname, lastname, email, message
            };

            const contact = await this.service.create(data);

            res.status(200).json(contact);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}