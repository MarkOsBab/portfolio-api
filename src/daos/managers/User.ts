import mongoose, { Model } from "mongoose";
import UserInterface from "../../interfaces/user.interface.js";
import { UserModel } from "../models/user.model.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "../../enums/user.enum.js";

export class User {
    private model: Model<UserInterface>;

    constructor() { 
        this.model = UserModel;
    }

    public async findById(id: string): Promise<UserInterface | null> {
        try {
            if(!mongoose.Types.ObjectId.isValid(id)) {
                CustomError.generateCustomError({
                    name: ErrorNames.GENERAL_ERROR_NAME,
                    message: ErrorMessages.ID_NOT_VALID_MESSAGE
                });
            }
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
    
    public async findByUsernameAndPassword(username: String, password: String): Promise<UserInterface | null | undefined> {
        try {
            return await this.model.findOne({username, password});
        } catch (error: any) {
            throw error;
        }
    }
}