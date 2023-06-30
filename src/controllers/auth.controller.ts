import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { generateToken, isValidPassword } from "../utils/utils.js";

export class AuthController {
    private service: UserService;
    private tokenExpiresIn: string = "1d";

    constructor(){
        this.service = new UserService();
    }

    public async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await this.service.findByUsernameAndPassword(username, password);
            
            if(user) {
                const isValid = isValidPassword(user, password);
                if(isValid) {
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
                } else {
                    res.status(400).send({error: "Invalid credentials"});
                }
            } 
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}