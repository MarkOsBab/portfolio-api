import mongoose, { Model } from "mongoose";
import KnowledgeInterface from "../../interfaces/knowledge.interface.js";
import { KnowledgeModel } from "../models/knowledge.model.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorMessages, ErrorNames } from "../../enums/knowledge.enum.js";

export class Knowledge {
    private model: Model<KnowledgeInterface>;

    constructor() {
        this.model = KnowledgeModel;
    }

    public async getAll(category?: string): Promise<KnowledgeInterface[]> {
        try {
            const filter = category ? { category } : {};
            return await this.model.find(filter);
        } catch(error: any) {
            throw error
        }
    }

    public async getOne(id: string): Promise<KnowledgeInterface | null> {
        try {
            if(!mongoose.Types.ObjectId.isValid(id)) {
                CustomError.generateCustomError({
                    name: ErrorNames.GENERAL_ERROR_NAME,
                    message: ErrorMessages.ID_NOT_VALID_MESSAGE
                });
            }
            return await this.model.findById(id);
        } catch(error: any) {
            throw error;
        }
    }

    public async create(knowledge: KnowledgeInterface): Promise<KnowledgeInterface> {
        try {
            return await this.model.create(knowledge);
        } catch (error: any) {
            throw error;
        }
    }

    public async getByName(name: string): Promise<KnowledgeInterface | null> {
        try {
            return await this.model.findOne({name});
        } catch (error: any) {
            throw error;
        }
    }

    public async update(id:string, knowledge: KnowledgeInterface): Promise<KnowledgeInterface | null> {
        try {
            return await this.model.findByIdAndUpdate(id, knowledge, { new:true });
        } catch (error: any) {
            throw error;
        }
    };

    public async delete(id: string): Promise<KnowledgeInterface | null> {
        try {
            return await this.model.findByIdAndDelete(id, { new:true });
        } catch (error: any) {
            throw error;
        }
    }
}