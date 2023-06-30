import { Request, Response } from "express";
import { ContactService } from "../daos/services/contact.service.js";

export class ContactController {
    private service: ContactService;

    constructor(){
        this.service = new ContactService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const contacts = await this.service.getAll();
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
}