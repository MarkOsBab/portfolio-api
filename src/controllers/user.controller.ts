import { Request, Response } from "express";
import { generateToken } from "../utils/utils.js";
import { userService } from "../services/index.js";

export class UserController {
    private service: typeof userService;
    private tokenExpiresIn: string = "1d";

    constructor(){
        this.service = userService;
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const user = await this.service.create(data);
            
            const accessToken = generateToken(user, this.tokenExpiresIn);

            res.status(200).json({
                user: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                },
                accessToken: accessToken, 
                expiresIn: this.tokenExpiresIn
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
