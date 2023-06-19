import mongoose, { Model } from "mongoose";
import { KnowledgeModel } from "../models/knowledge.model.js";
import KnowledgeInterface from "../../interfaces/knowledge.interface.js";
import { CustomError } from "../../utils/customErrors.js";
import { ErrorNames, ErrorMessages } from "../services/validations/knowledge.validation.js";

export class KnowledgeRepository {
    private model: Model<KnowledgeInterface>;

    constructor(){
        this.model = KnowledgeModel;
    }

    public async getAll(): Promise<KnowledgeInterface[]> {
        try {
            return await this.model.find();
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
}