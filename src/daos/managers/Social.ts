import mongoose, { Model } from "mongoose";
import Socialinterface from "../../interfaces/social.interface.js";
import { SocialModel } from "../models/social.model.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "../../enums/social.enum.js";

export class Social {
    private model: Model<Socialinterface>;

    constructor() {
        this.model = SocialModel;
    }

    public async getAll(): Promise<Socialinterface[]> {
        try {
            return await this.model.find();
        } catch (error: any) {
            throw error;
        }
    }

    public async getOne(id: string): Promise<Socialinterface | null> {
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

    public async create(social: Socialinterface): Promise<Socialinterface> {
        try {
            return await this.model.create(social);
        } catch (error: any) {
            throw error;
        }
    }

    public async update(id: string, social: Socialinterface): Promise<Socialinterface | null> {
        try {
            return await this.model.findByIdAndUpdate(id, social, { new: true });
        } catch (error: any) {
            throw error;
        }
    }

    public async delete(id: string): Promise<Socialinterface | null> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error: any) {
            throw error;
        }
    }
}