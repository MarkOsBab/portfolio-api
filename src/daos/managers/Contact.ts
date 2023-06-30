import mongoose, { Model } from "mongoose";
import ContactInterface from "../../interfaces/contact.interface.js";
import { ContactModel } from "../models/contact.model.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "../../enums/contact.enum.js";

export class Contact {
    private model: Model<ContactInterface>;

    constructor() {
        this.model = ContactModel;
    }

    public async getAll(): Promise<ContactInterface[]> {
        try {
            return await this.model.find();
        } catch (error: any) {
            throw error;
        }
    }

    public async getOne(id: string): Promise<ContactInterface | null> {
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
}