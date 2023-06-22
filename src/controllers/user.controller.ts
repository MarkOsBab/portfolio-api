import { Request, Response } from "express";
import { UserService } from "../daos/services/user.service.js";

export class UserController {
    private service: UserService;

    constructor(){
        this.service = new UserService();
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).send(req.user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
