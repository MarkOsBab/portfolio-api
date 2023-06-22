import { UserModel } from "../models/user.model.js";
import UserInterface from "../../interfaces/user.interface.js";
import { Model } from "mongoose";

export class UserRepository {
    private model: Model<UserInterface>;

    constructor(){
        this.model = UserModel;
    }

    public async findById(id: string): Promise<UserInterface | null> {
        try {
            return await this.model.findById(id);
        } catch (error: any) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserInterface | null> {
        try {
            return await this.model.findOne({email});
        } catch (error: any) {
            throw error;
        }
    }

    public async findByUsername(username: string): Promise<UserInterface | null> {
        try {
            return await this.model.findOne({username});
        } catch (error: any) {
            throw error;
        }
    }

    public async create(user: UserInterface): Promise<UserInterface> {
        try {
            return await this.model.create(user);
        } catch (error: any) {
            throw error;
        }
    }
    
}